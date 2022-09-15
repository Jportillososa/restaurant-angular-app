import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Friends } from './friends';
import { FriendsService } from './friends.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public friends: Friends[];
  public editFriends: Friends | undefined;
  // binding this component to form
  public deleteFriends: Friends | undefined;

  constructor(private friendsService: FriendsService) {}

  ngOnInit() {
    this.getFriends();
  }
  //
  public getFriends(): void {
    this.friendsService.getFriends().subscribe({
      next: (response: Friends[]) => {
        this.friends = response;
        console.log(this.friends);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
  //ADD FRIEND COMPONENT
  public onAddFriends(addForm: NgForm): void {
    document.getElementById('add-friends-form').click();
    this.friendsService.addFriends(addForm.value).subscribe({
      next: (response: Friends) => {
        console.log(response);
        this.getFriends();
        addForm.reset();
        // This resets the form after it is used
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }
  // EDIT COMPONENT
  public onUpdateFriends(friends: Friends): void {
    this.friendsService.updateFriends(friends).subscribe({
      next: (response: Friends) => {
        console.log(response);
        this.getFriends();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
  // DELETE FRIENDS COMPONENT
  public onDeleteFriends(friendsId: number): void {
    this.friendsService.deleteFriends(friendsId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getFriends();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
  // SEARCHING WITHIN ARRAY OF FRIENDS
  public searchFriends(key: string): void {
    console.log(key);
    const results: Friends[] = [];
    // THis is a for loop that loops through all of employees
    for (const friends of this.friends) {
      if (
        // translates to lowercase, if index of this key exists (in lowercase)
        friends.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        friends.restaurant.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        friends.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        friends.reservationTime.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        // pushes results to new list
        results.push(friends);
      }
    }
    this.friends = results;
    if (results.length === 0 || !key) {
      this.getFriends();
    }
  }

  //Mode tell user exactly what to do
  public onOpenModal(mode: string, friends?: Friends | null): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFriendsModal');
    }
    if (mode === 'edit') {
      this.editFriends = friends;
      button.setAttribute('data-target', '#updateFriendsModal');
      // When button is clicked this opens the edit form
    } else if (mode === 'delete') {
      this.deleteFriends = friends;
      button.setAttribute('data-target', '#deleteFriendsModal');
    }
    container.appendChild(button);
    button.click();
  }
  // Creates button in NAVBAR
}
