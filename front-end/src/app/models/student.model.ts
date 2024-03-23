export class Student {
  id: number;
  fullName: string;
  math: null | null;
  history: null | null;
  physicalEdu: null | null;

  editMode: {
    math: boolean;
    history: boolean;
    physicalEdu: boolean;
  };
}
