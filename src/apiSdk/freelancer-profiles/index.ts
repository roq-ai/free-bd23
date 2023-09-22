import axios from 'axios';
import queryString from 'query-string';
import { FreelancerProfileInterface, FreelancerProfileGetQueryInterface } from 'interfaces/freelancer-profile';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFreelancerProfiles = async (
  query?: FreelancerProfileGetQueryInterface,
): Promise<PaginatedInterface<FreelancerProfileInterface>> => {
  const response = await axios.get('/api/freelancer-profiles', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFreelancerProfile = async (freelancerProfile: FreelancerProfileInterface) => {
  const response = await axios.post('/api/freelancer-profiles', freelancerProfile);
  return response.data;
};

export const updateFreelancerProfileById = async (id: string, freelancerProfile: FreelancerProfileInterface) => {
  const response = await axios.put(`/api/freelancer-profiles/${id}`, freelancerProfile);
  return response.data;
};

export const getFreelancerProfileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/freelancer-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFreelancerProfileById = async (id: string) => {
  const response = await axios.delete(`/api/freelancer-profiles/${id}`);
  return response.data;
};
