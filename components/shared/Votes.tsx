'use client'
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { viewQuestion } from '@/lib/actions/interaction.action';
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action';
import { toggleSavedQuestion } from '@/lib/actions/user.action';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname ,useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
interface Props {
  type:string;
  itemId:string;
  userId:string;
  upvotes:number; 
  downvotes:number;
  hasupVoted:boolean;
  hasdownVoted:boolean;
  hasSaved?:boolean;
}
const Votes = ({type,itemId,userId,upvotes,downvotes,hasdownVoted,hasSaved,hasupVoted}:Props) => {
  const pathname = usePathname()
  const router = useRouter()
  const handleSave =async () =>{
    console.log('clicked');

    await toggleSavedQuestion({
      userId:JSON.parse(userId),
      questionId:JSON.parse(itemId),
      path:pathname
    })
    

  }
  const handleVote =async  (votetype:string) => {
    if (!userId) {
      return;
    }
    if (votetype === 'upvote') {
      if (type === 'Question') {
        await upvoteQuestion({
          questionId:JSON.parse(itemId),
          userId:JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path:pathname
        }) 
      } else if(type === 'Answer') {
        await upvoteAnswer({
          answerId:JSON.parse(itemId),
          userId:JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path:pathname
        }) 
      }
      return;
    }
    if (votetype ==='downvote') {
      if (type === 'Question') {
        await downvoteQuestion({
          questionId:JSON.parse(itemId),
          userId:JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path:pathname
        }) 
      } else if(type === 'Answer') {
        await downvoteAnswer({
          answerId:JSON.parse(itemId),
          userId:JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path:pathname
        }) 
      }
    }
  }
  useEffect(() => {
   viewQuestion({
    questionId:JSON.parse(itemId),
    userId:userId ? JSON.parse(userId): undefined,

   })
  }, [itemId,userId,pathname ,router])
    
  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-3'>
        <div className='flex-center gap-2'>
          <Image
          src={hasupVoted ?
            '/assets/icons/upvoted.svg':
            '/assets/icons/upvote.svg'
          }
          width={18}
          height={18}
          alt='upvote'
          className='cursor-pointer'
          onClick={ () => handleVote('upvote')}

          />
          <div className='flex-center background-light700_dark400 min-w-[18px]
          rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className='flex-center gap-2'>
          <Image
          src={hasdownVoted ?
            '/assets/icons/downvoted.svg':
            '/assets/icons/downvote.svg'
          }
          width={18}
          height={18}
          alt='downvote'
          className='cursor-pointer'
          onClick={ () => handleVote('downvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px]
          rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {
        type==='Question' &&
        <Image
          src={hasSaved ?
            '/assets/icons/star-filled.svg':
            '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          alt='star'
          className='cursor-pointer'
          onClick={handleSave}
          /> 
      }
      
    </div>
  )
}

export default Votes