import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { Subject, map } from "rxjs";

@Injectable({providedIn : 'root'})

export class PostsService {
    private posts: Post[] = [ {id : null, title  : 'title' , content : 'content'}];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http : HttpClient){}

    getPosts(){
        this.http.get<{message:string, response: any}>('http://localhost:3000/api/posts')
        .pipe(map((res) =>{
            return res.response.map(post =>{
                return {
                    title : post.title,
                    content:post.content,
                    id : post._id
                };
            });
        })).subscribe((transformedPosts)=>{
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
        });
    }

    addPost(title : string, content : string){
        const newlyCreatedPost: Post = {id : null, title : title, content : content};
        this.http.post<{message: string, postId : string}>("http://localhost:3000/api/posts",newlyCreatedPost).subscribe
        ((res) =>{
        const postId = res.postId;
        newlyCreatedPost.id = postId;
        this.posts.push(newlyCreatedPost);
        this.postsUpdated.next([...this.posts]);
        });

    }

    deletePost(postId : string){
        this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe((res)=>{
        console.log("deleted");
        const updatedPosts = this.posts.filter((post=> post.id != postId));
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
    });



  }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }
}