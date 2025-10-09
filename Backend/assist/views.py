from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Topic, Note
from .serializers import TopicSerializer, NoteSerializer
from rest_framework import status
from collections import Counter
import re
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'content', 'tags']

    @action(detail=True, methods=['post'])
    def generate_summary(self, request, pk=None):
        note = self.get_object()
        try:
            summary = self.generate_ai_summary(note.content)
            note.summary = summary
            note.save()
            return Response({'summary': summary})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def suggest_tags(self, request, pk=None):
        note = self.get_object()
        try:
            tags = self.generate_ai_tags(note.content)
            note.tags = tags
            note.save()
            return Response({'tags': tags})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def generate_ai_summary(self, content):
        try:
            # Tokenize the text into sentences
            sentences = sent_tokenize(content)
            
            # Create word frequency distribution
            words = word_tokenize(content.lower())
            stop_words = set(stopwords.words('english'))
            words = [word for word in words if word.isalnum() and word not in stop_words]
            word_freq = Counter(words)
            
            # Score sentences based on word frequency
            sentence_scores = {}
            for sentence in sentences:
                for word in word_tokenize(sentence.lower()):
                    if word in word_freq:
                        if sentence not in sentence_scores:
                            sentence_scores[sentence] = word_freq[word]
                        else:
                            sentence_scores[sentence] += word_freq[word]
            
            # Get top 2-3 sentences for summary
            summary_sentences = sorted(sentence_scores.items(), 
                                    key=lambda x: x[1], 
                                    reverse=True)[:3]
            summary = ' '.join([s[0] for s in summary_sentences])
            
            return summary
        except Exception as e:
            raise Exception(f"Error generating summary: {str(e)}")

    def generate_ai_tags(self, content):
        try:
            # Tokenize and clean the text
            words = word_tokenize(content.lower())
            stop_words = set(stopwords.words('english'))
            words = [word for word in words if word.isalnum() and word not in stop_words]
            
            # Get word frequency
            word_freq = Counter(words)
            
            # Get the most common words as tags (excluding very short words)
            tags = [word for word, freq in word_freq.most_common(10) 
                   if len(word) > 3][:5]
            
            return tags
        except Exception as e:
            raise Exception(f"Error generating tags: {str(e)}")
