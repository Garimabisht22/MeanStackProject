import { Component, Input, OnInit } from '@angular/core';
import {Post} from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

 posts : Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService : PostsService) {}

  ngOnInit(): void {

    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts:Post[])=>{
      console.log(posts)
      this.posts = posts;
    });

  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onDelete(postId : string){
    console.log("postId", postId)
    this.postsService.deletePost(postId);
  }

}
