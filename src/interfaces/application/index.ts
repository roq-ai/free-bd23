import { JobInterface } from 'interfaces/job';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ApplicationInterface {
  id?: string;
  job_id: string;
  freelancer_id: string;
  status: string;
  applied_at?: any;
  created_at?: any;
  updated_at?: any;

  job?: JobInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  job_id?: string;
  freelancer_id?: string;
  status?: string;
}
