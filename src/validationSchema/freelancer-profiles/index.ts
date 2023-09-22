import * as yup from 'yup';

export const freelancerProfileValidationSchema = yup.object().shape({
  portfolio_link: yup.string().nullable(),
  average_rating: yup.number().nullable(),
  total_jobs_completed: yup.number().integer().nullable(),
  freelancer_id: yup.string().nullable(),
});
