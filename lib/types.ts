export interface ISearchResult extends IUser {
  projects_users: IPoject[];
  cursus_users: { skills: ISkill[]; level: number; grade: string }[];
}

export interface ISkill {
  id: number;
  name: string;
  level: number;
}
export interface IUser {
  login: string;
  email: string;
  phone: string;
  location: string;
  correction_point: number;
  wallet: number;
  pool_year: string;
  displayname: string;

  image: {
    link: string;
  };
}

export interface IPoject {
  final_mark: number;
  status: ProjectStatus;
  'validated?': boolean;

  project: {
    name: string;
  };
}

export type ProjectStatus =
  | 'finished'
  | 'in_progress'
  | 'failed'
  | 'waiting_for_correction'
  | 'searching_a_group';
