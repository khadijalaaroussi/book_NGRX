import { Injectable } from "@angular/core";
import {Actions,createEffect,ofType} from '@ngrx/effects';
import * as bookActions from './books.actions';
import { BookService } from "./book.service";
import { mergeMap ,map,catchError, of} from "rxjs";
@Injectable()
export class BookEffects{
    //this is an NGrx EFFECT THAT RESPOND TO 'addbook' actions.
    addBooks$=createEffect(()=>this.actions$.pipe(
        //listen of actions of type 'addbook'
        ofType(bookActions.AddBook),
        //for each 'addbook'action,call 'addBook'
            //mergeMap allows multiple concurrent 'addbook' calls
mergeMap((action)=>this.bookService.addBook(action).pipe(
// if the addbook call is successful,dispatch 'addbookSuccess' action with the book data
    map(book=>bookActions.AddBookSuccess(book)),
    // if the 'addbook' call fails,dispatch 'addbookfailure' action with the error
    catchError((error)=>of(bookActions.AddBookFailure({error})))
))
));
constructor(
    private actions$:Actions,
    private bookService:BookService
){

}
}