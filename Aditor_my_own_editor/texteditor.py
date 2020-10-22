from tkinter import *
from tkinter import filedialog

class aditor:
    j=[]
    
    current_open_file="no_file"
    def open_file(self,event=""):
        open_return=filedialog.askopenfile(initialdir=root,title='Select a text file',filetypes=(("Text file","*.txt"),("All files","*.*")))
        if(open_return!=None):
            self.text_area.delete(1.0,END)
            for line in open_return:
                self.text_area.insert(END,line)
            self.current_open_file=open_return.name
            open_return.close()
    
    def save_as_file(self,event=""):
        f=filedialog.asksaveasfile(mode="w",defaultextension=".txt")
        if f is None:
            return
        text2save=self.text_area.get(1.0,END)
        self.current_open_file=f.name
        f.write(text2save)

        f.close()
        
        
    def save_file(self,event=""):
        if self.current_open_file=="no_file":
            self.save_as_file()
        else:
            f=open(self.current_open_file,"w+")
            f.write(self.text_area.get(1.0,END))
            f.close()
            
            
    def new_file(self,event=""):
        if len(self.text_area.get('1.0',END+'-1c')) > 0:
            if messagebox.askyesno("Save?","Do you want to save?"):
                self.save_file()
                self.text_area.delete("1.0",END)
            else:
                self.text_area.delete("1.0",END)      
        
        
       # self.text_area.delete(1.0,END)
        #self.current_open_file="no_file"
        
    def quit(self):
        if messagebox.askyesno("Quit","Are you sure?"):
            root.destroy()
    def copy_text(self):
        self.text_area.clipboard_clear()
        self.text_area.clipboard_append(self.text_area.selection_get())
    
    def cut_text(self):
        self.copy_text()
        self.text_area.delete("sel.first","sel.last")
        
    def paste_text(event=""):
        self.text_area.insert(INSERT,self.text_area.clipboard_get())

    def about_file(self):
        label=messagebox.showinfo("About","A notepad alternative created by aditya sharma")
    
    def version(self):
        label=messagebox.showinfo("Version","Version-1.0")
    
    
    def findinfile(self):
        findstring=simpledialog.askstring('Find..',"Enter Text")
        data=self.text_area.get('1.0',END)
        
        occurences=data.upper().count(findstring.upper())
        
        if data.upper().count(findstring.upper()) >0:
            label=messagebox.showinfo("Results",findstring+" text occured "+str(occurences) +" times")
            self.text_area.focus_set(findstring,fg="blue")
        else:
            label=messagebox.showinfo("Results",findstring+" text does not occured any time")
            
        
        
    
    #def remove(self,event=""):
        #self.text_area.delete("1.0",END)
    
    def bind_shortcuts(self):
        self.text_area.bind('<Control-o>',self.open_file)
        self.text_area.bind('<Control-n>',self.new_file)
        self.text_area.bind('<Control-s>',self.save_file)
        self.text_area.bind('<Control-a>',self.save_as_file)
        self.text_area.bind('<Control-c>',self.copy_text)
        self.text_area.bind('<Control-v>',self.paste_text)
        self.text_area.bind('<Control-z>',self.text_area.edit_undo)
        self.text_area.bind('<Control-x>',self.text_area.edit_redo)
        #self.text_area.bind('<Control-b>',self.remove)
        
        
        
    def __init__(self,master):
        
        font_specs=("Arial bold",18)
        self.j=[]
        self.k=[]
        
        self.master=master
        master.title("aditor")
        self.text_area=Text(self.master,undo=True,font=font_specs)
        self.text_area.pack(fill=BOTH,expand=1)
        self.main_menu=Menu()
        self.master.config(menu=self.main_menu)
        
        
        self.bind_shortcuts()
        
        #create file menu
        self.file_menu=Menu(self.main_menu,font=font_specs,tearoff=0)
        self.main_menu.add_cascade(label="File",font=font_specs,menu=self.file_menu)
        self.file_menu.add_command(label="New",accelerator="Control-n",command=self.new_file) 
        self.file_menu.add_command(label="Open",accelerator="Control-o",command=self.open_file)
        self.file_menu.add_separator()        
        self.file_menu.add_command(label="Save",accelerator="Control-s",command=self.save_file) 
        self.file_menu.add_command(label="Save as",accelerator="Control-a",command=self.save_as_file)
        self.file_menu.add_separator()
        self.file_menu.add_command(label="Exit",command=self.quit) 
        
        j=[]
        
        #create edit menu
        self.edit_menu=Menu(self.main_menu,font=font_specs,tearoff=0)
        self.main_menu.add_cascade(label="Edit",font=font_specs,menu=self.edit_menu)
        self.edit_menu.add_command(label="Copy",accelerator="Control-c",command=self.copy_text)
        self.edit_menu.add_command(label="Cut",command=self.cut_text)
        self.edit_menu.add_command(label="Paste",accelerator="Control-v",command=self.paste_text)
        self.edit_menu.add_separator()
        self.edit_menu.add_command(label="Undo",accelerator="Control-z",command=self.text_area.edit_undo)
        self.edit_menu.add_command(label="Redo",accelerator="Control-x",command=self.text_area.edit_redo)
        
       
        
        #create about menu
        self.about_menu=Menu(self.main_menu,font=font_specs,tearoff=0)
        self.main_menu.add_cascade(label="About",font=font_specs,menu=self.about_menu)
        self.about_menu.add_command(label="Description",command=self.about_file)
        self.about_menu.add_command(label="Version",command=self.version)
        
        #create fin menu
        self.find_menu=Menu(self.main_menu,font=font_specs,tearoff=0)
        self.main_menu.add_cascade(label="Find",font=font_specs,command=self.findinfile)
root=Tk()


te=aditor(root)


root.mainloop()
