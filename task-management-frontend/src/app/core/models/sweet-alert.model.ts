import Swal from 'sweetalert2';

export function successAlert(title: string, message: string) {
  Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    showConfirmButton: false,
    timer: 1000,
  });
}

export function errorAlert(title: string, message: string) {
  Swal.fire({
    icon: 'error',
    title: title,
    text: message,
    showConfirmButton: false,
    timer: 1000,
  });
}
export function confirmDelete(entityName: string = 'item'): Promise<boolean> {
  return Swal.fire({
    title: `Delete ${entityName}?`,
    text: `Are you sure you want to delete this ${entityName}? This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  }).then((result) => result.isConfirmed);
}
