export interface Identity extends WithTime {
  id: string;
}
export interface WithTime {
  createdAt: Date;
  updatedAt: Date;
}

export interface DataWithTime {
  created_at?: string;
  updated_at?: string;
}

export interface Snapshot extends DataWithTime {
  id?: string;
}
