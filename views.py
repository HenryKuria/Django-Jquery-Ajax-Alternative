from django.views import View
import json
from django.http.response import JsonResponse
from .models import Blog
from django.shortcuts import render


class BlogView(View):
    # view to show a single blog
    def get(self, request):

        # pass a blog to the template
        context = {'blog': Blog.objects.first()}

        return render(request, 'blog/blog.html', context=context)


class LikeBLogView(View):
    # view to enable liking a blog
    def post(self, request):

        data = json.loads(request.body)  # get data from ajax request

        blog_id = data.get('blog_id')
        blog = Blog.objects.get(id=blog_id)
        blog.likes += 1
        blog.save()

        # Return a json response
        return JsonResponse({'likes': blog.likes})
