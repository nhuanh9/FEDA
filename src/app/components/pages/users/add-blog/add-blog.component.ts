import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BlogService} from "../../../../services/blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  formBlog = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    status: new FormControl(''),
  })

  constructor(private blogService: BlogService,
              private router: Router) {
  }

  ngOnInit() {
  }

  save() {
    const today = new Date().toLocaleString('en-GB', {timeZone: 'UTC'});
    const blog = {
      title: this.formBlog.value.title,
      content: this.formBlog.value.content,
      status: this.formBlog.value.status,
      createAt: today,
      user: {
        id: localStorage.getItem('ID')
      }
    }
    this.blogService.add(blog).subscribe(() => {
      this.router.navigate(['/users'])
    })
  }
}
