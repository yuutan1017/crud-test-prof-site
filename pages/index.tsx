import React from 'react';
import Link from 'next/link';

export default function homePage() {
  return (
    <div className="grid grid-cols-3 justify-center text-center items-center w-full h-full mt-20 font-bold text-2xl hover:cursor-pointer">
      <Link href="/FetchAboutData">About</Link>
      <Link href="/FetchSkillData">Skill</Link>
      <Link href="/FetchWorkData">Work</Link>
    </div>
  );
}
