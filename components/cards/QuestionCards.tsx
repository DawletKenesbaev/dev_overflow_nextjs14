import Link from 'next/link';
import React from 'react'
import RenderTags from '../shared/RenderTags';
import Metric from '../shared/Metric';
import { formatNumber, getTimeStap } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteAction from '../shared/EditDeleteAction';
interface QuestionCardsProps {
_id: number;
title: string;
tags: {
    _id: string;
    name: string; 
}[];
author: {
    _id:string;
    name:string;
    picture: string;
    clerkId?:string
};
upvotes: number;
views: number;
answers: Array<object>;
createdAt: Date;
clerkId?:string | null;
}

const QuestionCards = ({_id,title,tags,author,upvotes,views,answers,createdAt,clerkId}:QuestionCardsProps) => {
  const showActionButtons = clerkId && clerkId === author?.clerkId  
  return ( 
    <div className='card-wrapper   rounded-[10px] p-9 sm:px-11'>
         <div className='flex
         flex-col-reverse items-start justify-between gap-5
         sm:flex-row '>
            <span className='subtle-regular text-dark400_light700
            line-clamp-1 flex sm:hidden'>
                 {getTimeStap(createdAt)}~
            </span> 
            <Link href={`/question/${_id}`}>
               <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
                {title}
               </h3>
            </Link>  
          <SignedIn>
              {showActionButtons &&(
                <EditDeleteAction
                 type='Question'
                 itemId = {JSON.stringify(_id)}
                 />
              )}
          </SignedIn> 
         </div>
         <div className='mt-4 flex flex-wrap gap-2'>
             {tags.map((tag) => (
                <RenderTags key={tag._id} _id={tag._id} title={tag.name} />
             ))}
         </div>
         <div className='flex-between mt-6 w-full flex-wrap gap-3'>
             <Metric
             imgUrl={author.picture}
             alt='user'
             value={author.name}
             title={` - asked ${getTimeStap(createdAt)}`}
             href={`/profile/${author.clerkId}`}
             isAuthor
             textStyles='body-medium text-dark400_light700'
              />
             <Metric
             imgUrl='/assets/icons/like.svg'
             alt='Upvotes'
             value={formatNumber(upvotes)}
             title=' Votes'
             textStyles='small-medium text-dark400_light800'
              />
              <Metric
             imgUrl='/assets/icons/message.svg'
             alt='answers'
             value={formatNumber(answers.length)}
             title=' Answers'
             textStyles='small-medium text-dark400_light800'
              />
              <Metric
             imgUrl='/assets/icons/eye.svg'
             alt='Views'
             value={formatNumber(views)}
             title=' Views'
             textStyles='small-medium text-dark400_light800'
              />
         </div>
    </div>
  )
}

export default QuestionCards