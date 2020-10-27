from django.db import models

# Create your models here.

class Questions(models.Model):
	question = models.CharField(max_length = 250)
	optiona = models.CharField(max_length = 100)
	optionb = models.CharField(max_length = 100)
	optionc = models.CharField(max_length = 100)
	optiond = models.CharField(max_length = 100)
	answer = models.CharField(max_length = 100)

	def __str__(self):
		return self.question




class User(models.Model):
	username=models.CharField(max_length=250)



class Score(models.Model):
	user=models.CharField(max_length=250)
	score=models.IntegerField()  



	
	