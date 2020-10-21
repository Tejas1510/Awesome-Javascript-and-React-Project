import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared/shared.service';
import { BaseService } from 'src/app/core/services';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  ELEMENT_DATA = [];
  displayedColumns: string[] = ['questionOrder', 'question', 'teacherFB', 'parentFB', 'solution'];
  dataSource = this.ELEMENT_DATA;
  teachersData = {
    username: 'Please Login',
    first_name: 'Please',
    last_name: 'Login',
    employee_sno: '',
    admission_date: '',
    aadhar_no: '',
    gender: '',
    dob: '',
    year: ''
  }
  rowQuestionModel = {
    questionOrder: '',
    question: '',
    teacherFB: '',
    parentFB: '',
    solution: ''
  }
  studentDetailsJSON = {
    university_sno: '',
    university_roll_no: '',
    gender: '',
    aadhar_no: '',
    dob: '',
    name: '',
    course_year: ''
  }
  Notification = {
    ptmNumber: '',
    ptmDate: '',
    ptmAgenda: '',
    status: ''
  }
  public openQuestionForm = false;
  public openButton = false;
  public openLoginTitle = true;
  isReadOnly: boolean;
  openFeedback: boolean;
  resResult: any;
  teacherDetails: any;
  PTMAgenda: any;
  studentDetails: any;
  feedbackData: any;
  PTMQuestions: any;
  PTMData: any;
  CoursesData: any;
  StudentsData: any;
  selectedPTM: string;
  selectedCourse: string;
  selectedStudent: string;
  PTMAgendaArray = [];
  PTMArray = [];
  CourseArray = [];
  StudentArray = [];
  PTMQuestionsArray = [];
  notify = [];
  Agenda = [];
  courses = [];
  students = [];
  studentsDataAll = [];
  constructor(
    public baseService: BaseService,
    public shared: SharedService
  ) {}
  ngOnInit() {
    this.teacherDetails = this.shared.getUserData();
    this.teachersData.username = this.teacherDetails.data.rows[0].username;
    this.teachersData.first_name = this.teacherDetails.data.rows[0].first_name;
    this.teachersData.last_name = this.teacherDetails.data.rows[0].last_name;
    this.teachersData.aadhar_no = this.teacherDetails.data.rows[0].aadhar_no;
    this.teachersData.admission_date = this.teacherDetails.data.rows[0].admission_date;
    this.teachersData.employee_sno = this.teacherDetails.data.rows[0].employee_sno;
    this.teachersData.gender = this.teacherDetails.data.rows[0].gender;
    this.teachersData.year = this.teacherDetails.data.rows[0].year;
    this.teachersData.dob = this.teacherDetails.data.rows[0].dob;

    if (this.teachersData.username === this.teacherDetails.data.rows[0].username) {
      this.openFeedbackFunc();
      this.closeLoginTitlefunc();
    } else {
      this.closeFeedbackFunc();
    }
    this.getPTMFun();
    this.getStudentFun();
    this.getCourseFun();
    this.getPTMAgendaFun();
  }
  async getPTMAgendaFun() {
    this.PTMAgenda = await this.baseService.getPtmAgenda();
    for (let i = 0; i < Object.keys(this.PTMAgenda.data.rows).length; i++) {
      let Model = {
        ptm_id: this.PTMAgenda.data.rows[i].ptm_id,
        ptm_date: this.PTMAgenda.data.rows[i].ptm_date,
        ptm_agenda: this.PTMAgenda.data.rows[i].ptm_agenda,
        status: this.PTMAgenda.data.rows[i].status
      }
      this.PTMAgendaArray.push(Model);
    }
  }
  async getPTMFun() {
    this.PTMData = await this.baseService.getPtmDetails();
    for (let i = 0; i < Object.keys(this.PTMData.data.rows).length; i++) {
      let PTMModel = {
        ptm_name: this.PTMData.data.rows[i].ptm_id
      }
      this.PTMArray.push(PTMModel);
    }
  }
  async getCourseFun() {
    this.CoursesData = await this.baseService.getPtmCourses();
    for (let i = 0; i < Object.keys(this.CoursesData.data.rows).length; i++) {
      let CourseModel = {
        course_year: this.CoursesData.data.rows[i].course_year
      }
      this.CourseArray.push(CourseModel);
    }
  }
  async getStudentFun() {
    this.StudentsData = await this.baseService.getPtmStudents();
    for (let i = 0; i < Object.keys(this.StudentsData.data.rows).length; i++) {
      let StudentModel = {
        university_sno: this.StudentsData.data.rows[i].university_sno,
        university_roll_no: this.StudentsData.data.rows[i].university_roll_no,
        gender: this.StudentsData.data.rows[i].gender,
        aadhar_no: this.StudentsData.data.rows[i].aadhar_no,
        dob: this.StudentsData.data.rows[i].dob,
        name: this.StudentsData.data.rows[i].name,
        course_year: this.StudentsData.data.rows[i].course_year
      }
      this.StudentArray.push(StudentModel);
    }
  }
  async getQuestions() {
    let body = {
      ptm_id: this.Notification.ptmNumber
    }
    console.log("GetPTMquestions: " + JSON.stringify(body))
    this.PTMQuestions = await this.baseService.getPtmQuestions(body);
    console.log("Questions: " + JSON.stringify(this.PTMQuestions))
    this.openButtonFunc();
  }
  async getFeedbackData() {
    let feedbackDataBody = {
      ptm_name: this.Notification.ptmNumber,
      roll_no: this.studentDetailsJSON.university_roll_no
    }
    this.feedbackData = await this.baseService.getFeedbackData(feedbackDataBody);
    if (Object.keys(this.feedbackData.data.rows[0])) {
      for (let i = 0; i < Object.keys(this.feedbackData.data.rows).length; i++) {
        this.rowQuestionModel = {
          questionOrder: this.PTMQuestions.data.rows[i].question_order,
          question: this.PTMQuestions.data.rows[i].question,
          teacherFB: this.feedbackData.data.rows[i].teacher_feedback,
          parentFB: this.feedbackData.data.rows[i].parents_feedback,
          solution: this.feedbackData.data.rows[i].solution
        },
        this.ELEMENT_DATA.push(this.rowQuestionModel);
      }
    } else {
      for (let i = 0; i < Object.keys(this.PTMQuestions.data.rows).length; i++) {
        this.rowQuestionModel = {
          questionOrder: this.PTMQuestions.data.rows[i].question_order,
          question: this.PTMQuestions.data.rows[i].question,
          teacherFB: '',
          parentFB: '',
          solution: ''
        }
        this.ELEMENT_DATA.push(this.rowQuestionModel);
      }
    }
    this.openQuestionFormFunc();

    if (this.teachersData.username === this.teacherDetails.data.rows[0].username) {
      this.isReadOnly = false;
    } else {
      this.isReadOnly = true;
    }
  }
  onSelectPTM(ptm_name: string) {
    this.closeQuestionFormFunc();
    this.selectedPTM = ptm_name;
    this.selectedCourse = "0";
    this.students = [];
    this.courses = this.getCourse().filter((item) => {
      return JSON.stringify(item.course_year)
    });
    this.Agenda = this.getPTMAgenda().filter((item) => {
      return JSON.stringify(item.ptm_id) === JSON.stringify(ptm_name)
    });
    this.Notification.ptmNumber = this.Agenda[0].ptm_id;
    this.Notification.ptmAgenda = this.Agenda[0].ptm_agenda;
    this.Notification.ptmDate = this.Agenda[0].ptm_date;
    this.Notification.status = this.Agenda[0].status;
  }
  onSelectCourse(course_year: string) {
    //his.closeQuestionFormFunc();
    this.getQuestions();
    this.selectedCourse = course_year;
    this.students = this.getStudent().filter((item) => {
      return JSON.stringify(item.course_year) === JSON.stringify(course_year)
    });
  }
  async onSelectStudent(university_roll_no: string) {
    //this.closeQuestionFormFunc();
    this.ELEMENT_DATA.length = 0;
    this.selectedStudent = university_roll_no;
    this.studentsDataAll = this.getStudent().filter((item) => {
      return JSON.stringify(item.university_roll_no) === JSON.stringify(university_roll_no)
    });
    this.studentDetailsJSON.university_sno = this.studentsDataAll[0].university_sno;
    this.studentDetailsJSON.university_roll_no = this.studentsDataAll[0].university_roll_no;
    this.studentDetailsJSON.gender = this.studentsDataAll[0].gender;
    this.studentDetailsJSON.aadhar_no = this.studentsDataAll[0].aadhar_no;
    this.studentDetailsJSON.dob = this.studentsDataAll[0].dob;
    this.studentDetailsJSON.name = this.studentsDataAll[0].name;
    this.studentDetailsJSON.course_year = this.studentsDataAll[0].course_year;
    this.getFeedbackData();
  }
  async submitClick() {
    let submitDataArray = [];
    let feedbackFormArray: any;
    let submitUrl = '';
    let body = {};
    let submitRowModel = {};
    try {
      feedbackFormArray = this.ELEMENT_DATA
      feedbackFormArray.forEach(element => {
        submitRowModel = {
          ptm: this.Notification.ptmNumber,
          questionOrder: element.questionOrder,
          question: element.question,
          teacherFeedback: element.teacherFB,
          parentsFeedback: element.parentFB,
          solution: element.solution,
          teacherUsername: this.teachersData.username,
          rollNo: this.studentDetailsJSON.university_roll_no
        }
        submitDataArray.push(submitRowModel);
      });
      body = {
        payload: submitDataArray
      }
      this.resResult = await this.baseService.postSubmitFeedback(body);
    } catch (error) {
      alert('submitClick: ' + error);
    }
  }
  getPTM() {
    return this.PTMArray;
  }
  getCourse() {
    return this.CourseArray;
  }
  getStudent() {
    return this.StudentArray;
  }
  getPTMAgenda() {
    return this.PTMAgendaArray;
  }
  openButtonFunc = async () => {
    console.log("Status: " + JSON.stringify(this.PTMQuestions.data.rows[0].status))
    if (this.PTMQuestions.data.rows[0].status == 'Active') {

      this.openButton = true;
    } else {
      this.openButton = false;
    }
  }
  openQuestionFormFunc = async () => {
    this.openQuestionForm = true;
  }
  closeQuestionFormFunc = async () => {
    this.openQuestionForm = false;
  }
  openFeedbackFunc = async () => {
    this.openFeedback = true;
  }
  closeFeedbackFunc = async () => {
    this.openFeedback = false;
  }
  openLoginTitlefunc = async () => {
    this.openLoginTitle = true;
  }
  closeLoginTitlefunc = async () => {
    this.openLoginTitle = false;
  }
}