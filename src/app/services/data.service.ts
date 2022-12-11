import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    categories: any = [
        { "title": "business", "ar": "إدارة أعمال" },
        { "title": "literature", "ar": "أدب" },
        { "title": "travel.literature", "ar": "أدب رحلات"},
        {"title": "religions","ar": "أديان"},
        {"title": "economics","ar": "اقتصاد"},
        {"title": "history","ar": "تاريخ"},
        {"title": "technology","ar": "تكنولوجيا"},
        {"title": "geography","ar": "جغرافيا"},
        {"title": "science.fiction","ar": "خيال علمي"},
        {"title": "novels","ar": "روايات"},
        {"title": "politics","ar": "سياسة"},
        {"title": "biographies","ar": "سير الأعلام"},
        {"title": "poetry","ar": "شعر"},
        {"title": "health","ar": "صحة"},
        {"title": "psychology","ar": " علم نفس"},
        {"title": "science","ar": "علوم"},
        {"title": "social.sciences","ar": "علوم اجتماعية"},
        {"title": "environmental.sciences","ar": "علوم البيئة"},
        {"title": "linguistics","ar": "علوم اللغة"},
        {"title": "philosophy","ar": "فلسفة"},
        {"title": "arts","ar": "فنون"},
        {"title": "children.stories","ar": "قصص الأطفال"},
        {"title": "detective.fiction","ar": "قصص بوليسية"},
        {"title": "plays","ar": "مسرحيات"},
        {"title": "literary.criticism","ar": "نقد أدبي"},
    ]
    constructor(private http: HttpClient) { }

    getBook(category) {
        return this.http.get(`${environment.url}`, { params: { category: category } })
    }

    downloadBook(ext, id, title) {
        return this.http.get(`${environment.url}/downlaod`,{params : {ext:ext, id:id, title:title}})
        // return this.http.get(`https://www.hindawi.org/books/${id}.${ext}`)
    }

    getCategory() {
        return this.categories
    }
}
