import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  bazaurl = "https://isi-paas-blog.onrender.com/"
  danein: any[] = []
  user: string = "";
  tytul: string = "";
  zawartosc: string = "";
  AxiosGet = async () => {
    let client = axios.create({
      baseURL: this.bazaurl
    });
    try {
      const response = await client.get(`/get-db/`);
      this.danein = response.data
    } catch (error) {
      console.log("error", error);
    }
  }

  AxiosPost = async () => {
    let client = axios.create({
      baseURL: this.bazaurl
    });
    const dane = {
      user: this.user,
      tytul: this.tytul,
      zawartosc: this.zawartosc
    }
    try {
      console.log(dane)
      const response = await client.put(`/add-db`, JSON.stringify(dane), {
      headers: { 'Content-Type': 'application/json' }
    });
    } catch (error) {
      console.log("error", error);
    }
  }

  Dodaj(){
    console.log("dodaj dodaje")
    this.AxiosPost()
  }


}
