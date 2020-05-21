from django.urls import path
from .views import LikeBLogView, BlogView


urlpatterns = [
    path('blog', BlogView.as_view(), name='single-blog'),
    path('blog/like/', LikeBLogView.as_view(), name='like-blog')
]
