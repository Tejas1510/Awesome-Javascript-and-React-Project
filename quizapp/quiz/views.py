
from django.shortcuts import render
from .models import Questions,User,Score
from .forms import PostForm
import copy


num=0

def first(request):
    form = PostForm()
    return render(request, 'quiz/first.html', {'form': form})

def quiz1(request):
    ques = Questions.objects.all()
    if request.method == 'POST':
        data = request.POST
        datas = list(dict(data).values())
        
        datas2=datas[1]
        def convert(s):
            str1 = "" 
            return(str1.join(s)) 
        datas2 = convert(datas2)

        p =User(username=datas2)
        p.save();
     
        e=User.objects.values()
        f=len(e)
        g=e[f-1]["username"]
    return render(request, 'quiz/quiz-1.html',{'ques':ques,'g':g})


def quize1(request):
    
    ques = Questions.objects.all()
    
    global num
    num=0
    if request.method == 'POST':
        data = request.POST
        datas = list(dict(data).values())
        
        datas2=datas[1]
        datas1=(Questions.objects.get(id =1)).answer
        def convert(s):
            str1 = "" 
            return(str1.join(s)) 
        datas2 = convert(datas2)
        if(datas1 in datas2):
            a="you got it"
            b=""
            c=""
            num=num+100;
        else:
            a="so sad , u got that wrong"
            b=" the right answer is:"
            c=(Questions.objects.get(id =1)).answer
    
    return render(request,'quiz/quiz-e1.html',{'ques':ques,'a':a,'b':b,'c':c})



def quiz2(request):
    ques = Questions.objects.all()
    return render(request, 'quiz/quiz-2.html',{'ques':ques,'num':num})


def quize2(request):
    
    ques = Questions.objects.all()
    
    global num
    if request.method == 'POST':
        data = request.POST
        datas = list(dict(data).values())
        
        datas2=datas[1]
        datas1=(Questions.objects.get(id =2)).answer
        def convert(s):
            str1 = "" 
            return(str1.join(s)) 
        datas2 = convert(datas2)
        if(datas1 in datas2):
            a="you got it"
            b=""
            c=""
            num=num+100;
        else:
            a="so sad , u got that wrong"
            b=" the right answer is:"
            c=(Questions.objects.get(id =2)).answer
    
    return render(request,'quiz/quiz-e2.html',{'ques':ques,'a':a,'b':b,'c':c})




def quiz3(request):
    ques = Questions.objects.all()
    return render(request, 'quiz/quiz-3.html',{'ques':ques,'num':num})


def quize3(request):
    
    ques = Questions.objects.all()
    
    global num
    if request.method == 'POST':
        data = request.POST
        datas = list(dict(data).values())
        
        datas2=datas[1]
        datas1=(Questions.objects.get(id =3)).answer
        def convert(s):
            str1 = "" 
            return(str1.join(s)) 
        datas2 = convert(datas2)
        if(datas1 in datas2):
            a="you got it"
            b=""
            c=""
            num=num+100;
        else:
            a="so sad , u got that wrong"
            b=" the right answer is:"
            c=(Questions.objects.get(id =3)).answer
    
    return render(request,'quiz/quiz-e3.html',{'ques':ques,'a':a,'b':b,'c':c})



def quiz4(request):
    ques = Questions.objects.all()
    return render(request, 'quiz/quiz-4.html',{'ques':ques,'num':num})


def quize4(request):
    
    ques = Questions.objects.all()
    
    global num
    if request.method == 'POST':
        data = request.POST
        datas = list(dict(data).values())
        
        datas2=datas[1]
        datas1=(Questions.objects.get(id =4)).answer
        def convert(s):
            str1 = "" 
            return(str1.join(s)) 
        datas2 = convert(datas2)
        if(datas1 in datas2):
            a="you got it"
            b=""
            c=""
            num=num+100;
        else:
            a="so sad , u got that wrong"
            b=" the right answer is:"
            c=(Questions.objects.get(id =4)).answer
    
    return render(request,'quiz/quiz-e4.html',{'ques':ques,'a':a,'b':b,'c':c})






def quiz5(request):
    ques = Questions.objects.all()
    return render(request, 'quiz/quiz-5.html',{'ques':ques,'num':num})


def quize5(request):
    
    ques = Questions.objects.all()
    
    global num
    if request.method == 'POST':
        data = request.POST
        datas = list(dict(data).values())
        
        datas2=datas[1]
        datas1=(Questions.objects.get(id =5)).answer
        def convert(s):
            str1 = "" 
            return(str1.join(s)) 
        datas2 = convert(datas2)
        if(datas1 in datas2):
            a="you got it"
            b=""
            c=""
            num=num+100;
        else:
            a="so sad , u got that wrong"
            b=" the right answer is:"
            c=(Questions.objects.get(id =5)).answer

    b1=list([num])
    c1=b1[:]
    for i in c1:
        d=i

    e=User.objects.values()
    f=len(e)
    g=e[f-1]["username"]
    p = Score(user=g,score=d)
    p.save();
    score= Score.objects.all()
    score1= Score.objects.all()
    score=score[0].score
    return render(request,'quiz/quiz-e5.html',{'ques':ques,'a':a,'b':b,'c':c,'d':d,'score':score})


def highscore(request):
    score= Score.objects.all().order_by('-score')[:5]
    return render(request,'quiz/scores.html',{'score':score})




def result(request):
    global num
    ques = Questions.objects.all()
    if request.method == 'POST':
        data = request.POST
        datas = list(dict(data).values())
        
        datas2=datas[1]
        datas1=(Questions.objects.get(id =5)).answer
        def convert(s):
            str1 = "" 
            return(str1.join(s)) 
        datas2 = convert(datas2)
        if(datas1 in datas2):
            num=num+100;

    
    b=list([num])
    c=b[:]
    for i in c:
        d=i


    return render(request, 'quiz/result.html',{'num':d})



