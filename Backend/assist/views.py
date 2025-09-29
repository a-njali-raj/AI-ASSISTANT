from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def welcome(request):
    return Response({
        "message": "Welcome to AI Assistant API!"
    })
