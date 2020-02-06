import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';
import { TweetData } from '../../models/TweetData';




@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  TweetData: TweetData = new TweetData();
  getState: Observable<any>;
  isAuthenticated: false;
  errorMessage = null;
  data:any;
  usertoken=null;
  baseurl=null;
  getdetails : Function;
  Tweet: string [];
  TweetDetails:JSON;
  showModal : boolean;

  constructor(
    private store: Store<AppState>,private http: HttpClient
  ) {
    this.getState = this.store.select(selectAuthState);
    this.showModal = false;

    this.getdetails = function(index){
    this.TweetDetails=this.Tweet[index];
    this.showModal = true;
    //console.log(this.TweetDetails);
    
  }
  }
  

  ngOnInit() {
    this.getState.subscribe((state) => {
      
      this.isAuthenticated = state.isAuthenticated;
      this.errorMessage = state.errorMessage;
      this.data=state.user;
    if(this.data!= null)
    {
      this.usertoken=this.data.idToken;
      this.getTweetData();
    }
   //console.log(this.usertoken);
    });
  };

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
      
    };
    this.store.dispatch(new LogIn(payload));
  }
 
 
  getTweetData():any {  
      this.baseurl = 'https://angular-sample-twitter.firebaseio.com/tweets.json?auth='; 
      console.log(this.baseurl+this.usertoken);
      if(this.usertoken!="")
      {
      
      this.http.get(this.baseurl+this.usertoken).subscribe(
        data => {
          // for (var i=0;i<=data.)
          this.Tweet = data as string [];	
         console.log(data);
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
      }
      
  }

  hide()
  {
    this.showModal = false;
  }

}