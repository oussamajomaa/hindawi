import { Component, OnInit } from '@angular/core';
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
			// this.loader1 = true
			this.selectedBooks.map(id => {
				let item = this.books.filter(book => book.id === id)
				let title = item[0].title
				// this.data.downloadBook(ext, id, title).subscribe((res: any) => {
				// 	message = res.message
				// 	this.loader1 = false
				// })
				let url = (`https://www.hindawi.org/books/${id}.${ext}`)
				window.open(url);
			})
			const allCheckBoxes = document.querySelectorAll(".check") as NodeListOf<HTMLInputElement>;
		
			allCheckBoxes.forEach(checkBox => {
				checkBox.checked = false;
			});
		
			this.selectedBooks = []
		}
		else {
			Swal.fire({
				icon: 'warning',
				title: "Select a book please !",
			})
		}
	}
}
