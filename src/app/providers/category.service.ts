import { Injectable, EventEmitter } from '@angular/core'

@Injectable() 
export class CategoryService {
     onCategoryChosed = new EventEmitter<any>();
}