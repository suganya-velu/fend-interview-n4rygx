import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync
} from "@angular/core/testing";
import { of } from "rxjs";
import { User } from "./user";
import { UserComponent } from "./user.component";
import { UserService } from "./user.service";
export class UserServiceStub {
  getUsers$() {
    return of([
      {
        id: "u_8nB75i9",
        name: "John Placeholder",
        email: "john.placeholder@fakemail.com",
        created_at: "2021-03-16T19:38:45.850Z",
        confirmed: true
      }
    ]);
  }
}
describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  const usersResponse: User[] = [
    {
      id: "u_8nB75i9",
      name: "John Placeholder",
      email: "john.placeholder@fakemail.com",
      created_at: "2021-03-16T19:38:45.850Z",
      confirmed: true
    }
  ];
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UserComponent],
        providers: [{ provide: UserService, useClass: UserServiceStub }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render the Get User button", () => {
    spyOn(component, "getUsers");
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector("button");
    expect(button.textContent).toContain("Get Users");
    let el = fixture.debugElement.nativeElement;
    let headerName = el.querySelector("h4");
    let p = Array.from(el.querySelectorAll("p")).map(
      ({ textContent }) => textContent
    );
    expect(headerName).toBeNull();
    expect(p).toEqual([]);
  });

  it("should call getUsers() on click of getUserts button", () => {
    spyOn(component, "getUsers").and.callThrough();
    const ele = fixture.debugElement.nativeElement.querySelector("button");
    ele.click();
    expect(component.getUsers).toHaveBeenCalledWith();
  });

  it("should populated when Get Users is clicked ", () => {
    const ele = fixture.debugElement.nativeElement.querySelector("button");
    ele.click();
    fixture.detectChanges();
    let el = fixture.debugElement.nativeElement;
    let headerName = el.querySelector("h4");
    let p = Array.from(el.querySelectorAll("p")).map(
      ({ textContent }) => textContent
    );
    let unconfirmed = el.querySelector(".text-danger");
    expect(headerName.textContent).toContain("John Placeholder");
    expect(p[0]).toBe("Email: john.placeholder@fakemail.com");
    expect(p[1]).toBe("Joined: 03/16/2021");
    expect(unconfirmed).toBeNull();
  });
});
