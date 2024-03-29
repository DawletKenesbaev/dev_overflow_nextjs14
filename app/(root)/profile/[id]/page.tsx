import { getUserInfo } from '@/lib/actions/user.action';
import { URLProps } from '@/types';
import {  SignedIn, auth } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getJoinedDate } from '@/lib/utils';
import ProfileLink from '@/components/shared/ProfileLink';
import QuestionTab from '@/components/shared/QuestionTab';
import AnswerTab from '@/components/shared/AnswerTab';
import { Button } from '@/components/ui/button';

const ProfilePage =async ({params,searchParams}:URLProps) => {
    const {userId:clerkId} = auth()
    const userInfo = await  getUserInfo({userId:params.id})    
    console.log(clerkId);
    
    return (
        <> 
          <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
              <div className='flex flex-col items-start gap-4 lg:flex-row'>
                 <Image 
                  src={userInfo?.user.picture}
                  alt='profile picture'
                  width={140}
                  height={140}
                  className='rounded-full object-cover'
                 />
                 <div className='mt-3'>
                    <h2 className='h2-bold text-dark100_light900 '>{userInfo.user.name}</h2>
                    <p className='paragraph-regular text-dark200_light800 '>
                        @{userInfo.user.username}
                        <br></br>
                        {params.id === 'user_2cWZ1XxOFfU77Ci1ikR7KxD6FXV' && (
                            <p className='h3-semibold  text-primary-500 '> Creator</p>
                        )}
                    </p>
                    <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
                        {userInfo.user.portfolioWebsite && (
                                <ProfileLink
                                imgUrl='/assets/icons/link.svg'
                                href={userInfo.user.portfolioWebsite}
                                title='Portfolio'
                                />
                            )}
                        {userInfo.user.location && (
                            <ProfileLink
                            imgUrl='/assets/icons/location.svg'
                            title={userInfo.user.location}
                             />
                        )}
                        <ProfileLink 
                        title={getJoinedDate(userInfo.user.joinedAt )}
                        imgUrl='/assets/icons/calendar.svg'
                        />
                    </div>
                    {/* {userInfo.user.bio &&  (
                        <p className='paragraph-regular text-dark400_light800 mt-8 '>
                            {userInfo.user.bio}
                        </p>
                    )} */}
                 </div>
              </div>
              <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
                   <SignedIn>
                      
                      {params.id === 'user_2cWZ1XxOFfU77Ci1ikR7KxD6FXV' && (
                        <a target='_blank' href='https://github.com/DawletKenesbaev'>
                            <Button
                             className='paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-1'>
                                GitHub Link
                            </Button>
                        </a>
                      )}
                   </SignedIn> 
              </div>
          </div>
          Stats
          <div className='mt-10 flex gap-10'>
          <Tabs defaultValue="top-posts" className="flex-1">
            <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
                <TabsTrigger className='tab' value="top-posts">Top Posts</TabsTrigger>
                <TabsTrigger className='tab' value="answers">Answers</TabsTrigger>
            </TabsList>
            <TabsContent value="top-posts">
                <QuestionTab
                searchParams={searchParams}
                userId={userInfo.user._id}
                clerkId={clerkId}
                 />
            </TabsContent>
            <TabsContent value="answers" className='flex w-full flex-col gap-6'>
                <AnswerTab
                searchParams={searchParams}
                userId={userInfo.user._id}
                clerkId={clerkId}
                 />
            </TabsContent>
          </Tabs>
          </div>
        </>
    ) 
};

export default ProfilePage;
