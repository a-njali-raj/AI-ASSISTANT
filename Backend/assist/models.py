from django.db import models
from django.utils import timezone


class Topic(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='notes')
    created_at = models.DateTimeField(default=timezone.now)
    summary = models.TextField(blank=True, null=True)
    tags = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title
