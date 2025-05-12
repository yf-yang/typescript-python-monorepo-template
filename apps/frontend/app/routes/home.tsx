import type { ReactNode } from 'react';
import { MdOutlinePlayArrow } from 'react-icons/md';

import { Button } from '@/components/shadcn-ui/button';

import type { Route } from './+types/home';

export function meta(_: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

const logger = MAKE_LOGGER('example');

export default function Home(): ReactNode {
  return (
    <div className="flex size-full items-center justify-center">
      <div>
        <Button
          variant="outline"
          onClick={async () => {
            INFO(logger, 'hello world');
            const response = await fetch('http://localhost:10086/echo', {
              method: 'POST',
              body: JSON.stringify({
                message: 'hello',
              }),
            });
            const data = (await response.json()) as object;
            INFO(logger, 'response: %o', data);
          }}
          className="mt-4"
        >
          <MdOutlinePlayArrow className="mr-2 size-4" />
        </Button>
      </div>
    </div>
  );
}
