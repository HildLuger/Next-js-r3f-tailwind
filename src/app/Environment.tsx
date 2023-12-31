// Environment.tsx

'use client';

import React from 'react';
import { Environment as DreiEnvironment } from '@react-three/drei';

const MyEnvironment = () => {
  return (
    <DreiEnvironment preset="sunset" background blur={0.5} />
  );
};

export default MyEnvironment;
