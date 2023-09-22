import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FreelancerProfileInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  portfolio_link?: string;
  average_rating?: number;
  freelancer_id?: string;
  total_jobs_completed?: number;

  user?: UserInterface;
  _count?: {};
}

export interface FreelancerProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  portfolio_link?: string;
  freelancer_id?: string;
}
