import React from 'react';
import Link from 'next/link';

export default function homePage() {
  return (
    <div className="grid grid-cols-3 justify-center items-center w-full h-full">
      <Link href="/FetchAboutData">About</Link>
      <Link href="/FetchSkillData">Skill</Link>
      <Link href="/FetchWorkData">Work</Link>
    </div>
  );
}
