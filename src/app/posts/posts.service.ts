import { Injectable } from "@angular/core";
import { Post } from "./post.model";

@Injectable({providedIn : 'root'})

export class PostsService {
    private posts: Post[] = [ {title  : 'titllle' , content : 'content'}];

    getPosts(){
        return this.posts;
    }

    addPost(title : string, content : string){
        const newlyCreatedPost: Post = {title : title, content : content};
        this.posts.push(newlyCreatedPost);
    }
}