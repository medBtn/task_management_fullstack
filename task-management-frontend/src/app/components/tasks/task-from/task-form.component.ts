import { CommonModule } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PAGIGNATION } from "../../../core/models/pagignation";
import { Task } from "../../../core/models/task.model";
import { User } from "../../../core/models/user.model";
import { UserStorageService } from "../../../core/services/auth/user-storage.service";
import { TaskService } from "../../../core/services/task.service";
import { UserService } from "../../../core/services/user.service";


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class taskFormComponent implements OnInit {
  @Input() task!: Task;
  taskForm!: FormGroup;
  loading = false;

  state = PAGIGNATION;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public activeModal: NgbActiveModal,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();

    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  loadUsers(): void {
    this.loading = true;
    this.state.pageSize = 1000;
    this.userService.searchUsers(this.state).subscribe(
      (users: any) => {
        this.users = users.content;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        console.error('Error loading users:', error);
      }
    );
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['TODO', Validators.required],
      assignedTo: [],
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const taskData = this.taskForm.value;
    taskData.createdBy = UserStorageService.getUserId();

    if (this.task) {
      taskData.id = this.task.id;
      this.taskService.updateTask(taskData).subscribe(
        () => {
          this.loading = false;
          this.activeModal.close();
        },
        (error: any) => {
          this.loading = false;
        }
      );
    } else {
      this.taskService.createTask(taskData).subscribe(
        () => {
          this.activeModal.close();
          this.loading = false;
        },
        (error: any) => {
          this.loading = false;
          console.error('Error creating task:', error);
        }
      );
    }
  }
}
