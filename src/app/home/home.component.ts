import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	@ViewChild ("selectAll") selectAll:ElementRef
	loader = true
	loader1 = false
	books: any = []
	bookID: string
	fileUrl: string
	categories: any = []
	selectedBooks = []

	constructor(private data: DataService, private http:HttpClient, private sanitizer: DomSanitizer) { }

	ngOnInit(): void {
		this.categories = this.data.categories
	}

	selectCategory(event) {
		this.books = []
		this.selectedBooks = []
		let category = event.target.value
		this.loader = false
		this.data.getBook(category).subscribe(res => {
			this.books = res;
			this.loader = true
		})
	}
	checkbox
	selectAllBooks(e) {
		this.selectedBooks = []
		const allCheckBoxes = document.querySelectorAll(".check") as NodeListOf<HTMLInputElement>;
		
		if (e.target.checked) {
			allCheckBoxes.forEach(checkBox => {
				checkBox.checked = true;
				this.selectedBooks.push(checkBox.value)
			});
		}
		else {
			allCheckBoxes.forEach(checkBox => {
				checkBox.checked = false;
			});
		}
	}

	selectBook(e) {
		if (e.target.checked) {
			this.selectedBooks.push(e.target.value)
		}
		else {
			let result = this.selectedBooks.filter(id => id != e.target.value)
			this.selectedBooks = result
		}
	}

	downloadOneFile(ext: string, id, title){
		let url = (`https://www.hindawi.org/books/${id}.${ext}`)
		window.open(url,"_parent")

	}

	downloadFile(ext: string) {
		if (this.selectedBooks.length > 0) {			
			let message = ""
			this.loader1 = true
			let length = this.selectedBooks.length-1
			for(let i=0; i<this.selectedBooks.length; i++){
				let id = this.selectedBooks[i]
				let item = this.books.filter(book => book.id === id)
				let title = item[0].title
				this.data.downloadBook(ext, id, title).subscribe((res: any) => {
					// let blob = new Blob([res], {type: 'application/txt'});
					// var downloadURL = window.URL.createObjectURL(blob);
					// var link = document.createElement('a');
					// link.href = downloadURL;
					// link.download = `${title}.txt`;
					// link.click();
								
					if(i==length) {
						this.loader1 = false
						Swal.fire({
							icon: 'warning',
							title: "Books downloded succeefully",
						})
					}
				})

				
			}
			
			const allCheckBoxes = document.querySelectorAll(".check") as NodeListOf<HTMLInputElement>;
		
			allCheckBoxes.forEach(checkBox => {
				checkBox.checked = false;
			});
		
			this.selectedBooks = []
			this.selectAll.nativeElement.checked = false
		}
		else {
			Swal.fire({
				icon: 'warning',
				title: "Select a book please !",
			})
		}
	}
}
