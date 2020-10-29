from flask import Flask,render_template,request
from PIL import Image
from werkzeug.utils import secure_filename
from io import BytesIO
import base64
import zlib
import os
image_Folder=os.path.join('static')
def lcs_printing(X, Y, m, n): 
    L = [[0 for x in range(n+1)] for x in range(m+1)] 
    for i in range(m+1): 
        for j in range(n+1): 
            if i == 0 or j == 0: 
                L[i][j] = 0
            elif X[i-1]==Y[j-1]: 
                L[i][j] = L[i-1][j-1] + 1
            else: 
                L[i][j] = max(L[i-1][j], L[i][j-1]) 
    index = L[m][n] 
    lcs = [""] * (index+1) 
    lcs[index] = "" 
    i = m 
    j = n 
    while i > 0 and j > 0: 
        if X[i-1] == Y[j-1]: 
            lcs[index-1] = X[i-1] 
            i-=1
            j-=1
            index-=1
        elif L[i-1][j] > L[i][j-1]: 
            i-=1
        else: 
            j-=1
    return "".join(lcs)
def lcs_byteSol(f1,f2,l1,l2): 
    lst2d=[[0 for x in range(l2+1)] for x in range(l1+1)] 
    for i in range(l1+1): 
        for j in range(l2+1): 
            if i==0 or j==0: 
                lst2d[i][j]=0
            elif f1[i-1]==f2[j-1]: 
                lst2d[i][j]=lst2d[i-1][j-1]+1
            else: 
                lst2d[i][j]=max(lst2d[i-1][j],lst2d[i][j-1]) 
    index=lst2d[l1][l2] 
    lcs=[""]*(index+1) 
    lcs[index]="" 
    i=l1
    j=l2 
    while i > 0 and j > 0: 
        if f1[i-1]==f2[j-1]: 
            lcs[index-1]=f1[i-1] 
            i-=1
            j-=1
            index-=1
        elif lst2d[i-1][j]>lst2d[i][j-1]: 
            i-=1
        else: 
            j-=1
    lcs.pop(-1)
    return lcs
def img2b64jpeg(image):
    buff=BytesIO()
    image.save(buff,format="JPEG")
    img_str=base64.b64encode(buff.getvalue())
    #print(type(sf))
    #print(type(img_str))
    #print(sf)
    return img_str
def img2b64png(image):
    buff=BytesIO()
    image.save(buff,format="PNG")
    img_str=base64.b64encode(buff.getvalue())
    #print(type(sf))
    #print(type(img_str))
    #print(sf)
    return img_str
app=Flask(__name__)
app.config['UPLOAD_FOLDER']=image_Folder
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/',methods=['POST','GET'])
def getvalue():
    image1=request.files['imagefile1']
    image2=request.files['imagefile2']
    filename1=secure_filename(image1.filename)
    filename2=secure_filename(image2.filename)
    for filename in os.listdir('static/'):
            os.remove('static/' + filename)
    image1.save(os.path.join(app.config['UPLOAD_FOLDER'],filename1))
    image2.save(os.path.join(app.config['UPLOAD_FOLDER'],filename2))
    #-----------------------------Image 1--------------------------------
    image1obj=Image.open(image1)
    type1=image1obj.format
    #print(type1)
    if type1=="JPEG":
        fimage1=image1obj.resize((80,80))
        my_string1=img2b64jpeg(fimage1)
        code1=zlib.compress(my_string1)
        code1byte=code1
        code1=str(code1)
        #code1=str(code1)
        imageshow1=filename1+"_compressed.jpg"
        fimage1.save(os.path.join(app.config['UPLOAD_FOLDER'],imageshow1))
        #print(code1)
    elif type1=="PNG":
        fimage1=image1obj.resize((80,80))
        my_string1=img2b64png(fimage1)
        code1=zlib.compress(my_string1)
        code1byte=code1
        code1=str(code1)
        #code1=str(code1)
        imageshow1=filename1+"_compressed.png"
        fimage1.save(os.path.join(app.config['UPLOAD_FOLDER'],imageshow1))
        #print(code1)
    #-----------------------------Image 2--------------------------------
    image2obj=Image.open(image2)
    type2=image2obj.format
    #print(type2)
    if type2=="JPEG":
        fimage2=image2obj.resize((80,80))
        my_string2=img2b64jpeg(fimage2)
        code2=zlib.compress(my_string2)
        code2byte=code2
        code2=str(code2)
        #code2=str(code2)
        imageshow2=filename2+"_compressed.jpg"
        fimage2.save(os.path.join(app.config['UPLOAD_FOLDER'],imageshow2))
        #print(code2)
    elif type2=="PNG":
        fimage2=image2obj.resize((80,80))
        my_string2=img2b64png(fimage2)
        code2=zlib.compress(my_string2)
        code2byte=code2
        code2=str(code2)
        #code2=str(code2)
        imageshow2=filename2+"_compressed.png"
        fimage2.save(os.path.join(app.config['UPLOAD_FOLDER'],imageshow2))
    
    
    #--------------------------------LCS Logic----------------------------
    compresslen1=len(code1byte)
    compresslen2=len(code2byte)
    mystringlen1=len(my_string1)
    mystringlen2=len(my_string2)
    subsequence=lcs_printing(code1,code2,len(code1),len(code2))
    sublen_byte=lcs_byteSol(code1byte,code2byte,compresslen1,compresslen2)
    sublen=len(sublen_byte)
    avglength=(compresslen1+compresslen2)/2
    percentmatch=(len(sublen_byte)/avglength)*100
    percentmatch=round(percentmatch,2)
    return render_template('pass.html',f=percentmatch,user1=imageshow1,user2=imageshow2,stringpass1=my_string1,stringpass2=my_string2,compress1=code1,compress2=code2,finallcs=subsequence,cl1=compresslen1,cl2=compresslen2,ms1=mystringlen1,ms2=mystringlen2,lcsl=sublen)
if __name__ == '__main__':
    app.run()