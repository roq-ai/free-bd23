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

import { createApplication } from 'apiSdk/applications';
import { applicationValidationSchema } from 'validationSchema/applications';
import { JobInterface } from 'interfaces/job';
import { UserInterface } from 'interfaces/user';
import { getJobs } from 'apiSdk/jobs';
import { getUsers } from 'apiSdk/users';
import { ApplicationInterface } from 'interfaces/application';

function ApplicationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ApplicationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createApplication(values);
      resetForm();
      router.push('/applications');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ApplicationInterface>({
    initialValues: {
      status: '',
      applied_at: new Date(new Date().toDateString()),
      job_id: (router.query.job_id as string) ?? null,
      freelancer_id: (router.query.freelancer_id as string) ?? null,
    },
    validationSchema: applicationValidationSchema,
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
              label: 'Applications',
              link: '/applications',
            },
            {
              label: 'Create Application',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Application
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="applied_at" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Applied At
            </FormLabel>
            <DatePicker
              selected={formik.values?.applied_at ? new Date(formik.values?.applied_at) : null}
              onChange={(value: Date) => formik.setFieldValue('applied_at', value)}
            />
          </FormControl>
          <AsyncSelect<JobInterface>
            formik={formik}
            name={'job_id'}
            label={'Select Job'}
            placeholder={'Select Job'}
            fetcher={getJobs}
            labelField={'title'}
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
              onClick={() => router.push('/applications')}
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
    entity: 'application',
    operation: AccessOperationEnum.CREATE,
  }),
)(ApplicationCreatePage);
