import React from 'react';
import { FetchAboutData } from '../components/FetchAboutData';
import { FetchSkillData } from '../components/FetchSkillData';
import { FetchWorkData } from '../components/FetchWorkData';

export default function homePage() {
  return (
    <div className="grid grid-cols-3 justify-center items-center w-full h-full">
      <FetchAboutData />
      <FetchSkillData />
      <FetchWorkData />
    </div>
  );
}
