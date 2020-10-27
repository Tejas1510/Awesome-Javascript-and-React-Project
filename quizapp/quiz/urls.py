from django.urls import path
from . import views

urlpatterns = [
    path('quiz1/', views.quiz1, name='blog-home'),
    path('quiz2/', views.quiz2, name='quiz-2'),
    path('quiz3/', views.quiz3, name='quiz-3'),
    path('quiz4/', views.quiz4, name='quiz-4'),
    path('quiz5/', views.quiz5, name='quiz-5'),
    path('quize1/', views.quize1, name='quiz-e1'),
    path('quize2/', views.quize2, name='quiz-e2'),
    path('quize3/', views.quize3, name='quiz-e3'),
    path('quize4/', views.quize4, name='quiz-e4'),
    path('quize5/', views.quize5, name='quiz-e5'),
   	path('result/', views.result, name='result'),
   	path('', views.first, name='first'),
   	path('highscore/', views.highscore, name='highscore')

    
]