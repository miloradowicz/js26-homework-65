import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { PageWithUrl } from '../../types';
import Api from '../../lib/api';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Textarea,
} from '@mui/joy';
import ContentLayout from '../../components/ContentLayout/ContentLayout';
import { useNavigate, useOutletContext } from 'react-router-dom';
import dashify from 'dashify';
import { useReload } from '../../App';

interface FormData {
  content?: string;
  title?: string;
}

const Admin = () => {
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<FormData>();
  const [pages, setPages] = useState<PageWithUrl[]>([]);
  const [select, setSelect] = useState<string>('create-new-page');
  const { reload } = useReload();

  const navigate = useNavigate();

  useEffect(() => {
    const loader = async () => {
      try {
        const data = await Api.getPages();

        setPages(data ?? []);
      } catch (err) {
        setError(err);
      }
    };

    loader();
  }, []);

  useEffect(() => {
    if (select === 'create-new-page') {
      setData({});
    }

    setData(pages.find((x) => x.url === select));
  }, [select, pages]);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const onSelect = (value: string) => {
    setSelect(value);
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (data?.title && data?.content) {
      let result;

      if (select === 'create-new-page') {
        result = await Api.createPage({
          title: data.title,
          content: data.content,
        });
      } else {
        result = await Api.updatePage(select, {
          title: data.title,
          content: data.content,
        });
      }

      if (result) {
        reload();
        navigate(`/pages/${dashify(data.title)}`);
      }
    }
  };

  return (
    <ContentLayout>
      <h3>{select === 'create-new-page' ? 'Create' : 'Edit'}</h3>
      <form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>Page</FormLabel>
          <Select
            value={select}
            onChange={(_, value) => onSelect(value || 'create-new-page')}
          >
            <Option value='create-new-page'>Create new page</Option>
            {pages.map((x) => (
              <Option key={x.url} value={x.url}>
                {x.url}
              </Option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input name='title' value={data?.title} onChange={onChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Content</FormLabel>
          <Textarea
            name='content'
            minRows={5}
            value={data?.content}
            onChange={onChange}
          />
        </FormControl>
        <Button type='submit'>Save</Button>
      </form>
    </ContentLayout>
  );
};

export default Admin;
