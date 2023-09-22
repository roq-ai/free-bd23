import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFreelancerProfile } from 'apiSdk/freelancer-profiles';
import { freelancerProfileValidationSchema } from 'validationSchema/freelancer-profiles';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { FreelancerProfileInterface } from 'interfaces/freelancer-profile';

function FreelancerProfileCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FreelancerProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFreelancerProfile(values);
      resetForm();
      router.push('/freelancer-profiles');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FreelancerProfileInterface>({
    initialValues: {
      portfolio_link: '',
      average_rating: 0,
      total_jobs_completed: 0,
      freelancer_id: (router.query.freelancer_id as string) ?? null,
    },
    validationSchema: freelancerProfileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Freelancer Profiles',
              link: '/freelancer-profiles',
            },
            {
              label: 'Create Freelancer Profile',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Freelancer Profile
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.portfolio_link}
            label={'Portfolio Link'}
            props={{
              name: 'portfolio_link',
              placeholder: 'Portfolio Link',
              value: formik.values?.portfolio_link,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Average Rating"
            formControlProps={{
              id: 'average_rating',
              isInvalid: !!formik.errors?.average_rating,
            }}
            name="average_rating"
            error={formik.errors?.average_rating}
            value={formik.values?.average_rating}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('average_rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Jobs Completed"
            formControlProps={{
              id: 'total_jobs_completed',
              isInvalid: !!formik.errors?.total_jobs_completed,
            }}
            name="total_jobs_completed"
            error={formik.errors?.total_jobs_completed}
            value={formik.values?.total_jobs_completed}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_jobs_completed', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'freelancer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/freelancer-profiles')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'freelancer_profile',
    operation: AccessOperationEnum.CREATE,
  }),
)(FreelancerProfileCreatePage);
