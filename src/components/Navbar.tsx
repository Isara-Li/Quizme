import { getAuthSession } from '@/lib/nextauth'
import React from 'react'

type Props = {}

const Navbar = async (props: Props) => {

    const session = await getAuthSession();
    if (session?.user){
      return <pre>{JSON.stringify(session.user,null,2)}</pre>;
    }
    else{
      return <div>Not logged in</div>
    }
  
};

export default Navbar