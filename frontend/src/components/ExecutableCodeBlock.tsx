import React, { useState, useEffect } from 'react';
import { PlayIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const ExecutableCodeBlock = ({ language, code, messageId, roomId, blockIndex, socket }: { language: string, code: string, messageId?: string, roomId?: string, blockIndex?: number, socket?: any }) => {
  const [output, setOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [runnerInfo, setRunnerInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;
    
    const handleStart = (data: any) => {
      if (data.messageId === messageId && data.blockIndex === blockIndex) {
        setIsExecuting(true);
        setRunnerInfo(data.runnerName || 'Someone');
        setOutput(null);
        setIsError(false);
      }
    };

    const handleResult = (data: any) => {
      if (data.messageId === messageId && data.blockIndex === blockIndex) {
        setIsExecuting(false);
        setRunnerInfo(null);
        setOutput(data.output);
        setIsError(data.isError);
      }
    };

    socket.on('code_execution_start', handleStart);
    socket.on('code_execution_result', handleResult);

    return () => {
      socket.off('code_execution_start', handleStart);
      socket.off('code_execution_result', handleResult);
    };
  }, [socket, messageId, blockIndex]);

  const handleRun = async () => {
    if (isExecuting) {
      alert(`This code is already being executed by ${runnerInfo || 'someone'}. Please wait for the result.`);
      return;
    }
    
    setIsExecuting(true);
    setOutput(null);
    setIsError(false);
    
    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : { displayName: 'User' };
      
      if (socket && roomId) {
        socket.emit('code_execution_start', { roomId, messageId, blockIndex, runnerName: user.displayName });
      }

      const res = await fetch('http://localhost:3005/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ language: language || 'javascript', code, messageId, roomId, blockIndex })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to execute code');
      }
      
      // If we don't have socket, fallback to local state
      if (!socket) {
        setOutput(data.run?.output || data.message || 'No output');
        if (data.run?.stderr || data.run?.code !== 0) {
          setIsError(true);
        }
        setIsExecuting(false);
      }
    } catch (err: any) {
      setOutput(err.message || 'Execution request failed.');
      setIsError(true);
      setIsExecuting(false);
    }
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-gray-700/50 bg-[#1e1e1e] shadow-lg max-w-full font-mono text-sm relative group text-left">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider ml-2">
            {language || 'text'}
          </span>
        </div>
        
        <button
          onClick={handleRun}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
            isExecuting ? 'bg-amber-500/10 text-amber-400 cursor-not-allowed' : 'bg-teal-500/10 text-teal-400 hover:bg-teal-500/20'
          }`}
        >
          {isExecuting ? (
            <>
              <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
              RUNNING...
            </>
          ) : (
            <>
              <PlayIcon className="w-3 h-3" />
              RUN
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-gray-300">
        <pre className="m-0 whitespace-pre"><code>{code}</code></pre>
      </div>

      {/* Output Area */}
      {output !== null && (
        <div className={`border-t border-gray-700/50 p-4 ${isError ? 'bg-red-900/10' : 'bg-black/20'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isError ? <XCircleIcon className="w-4 h-4 text-red-400" /> : <CheckCircleIcon className="w-4 h-4 text-green-400" />}
            <span className={`text-xs font-bold uppercase tracking-wider ${isError ? 'text-red-400' : 'text-green-400'}`}>
              Output
            </span>
          </div>
          <pre className={`text-xs whitespace-pre-wrap ${isError ? 'text-red-300' : 'text-gray-300'}`}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ExecutableCodeBlock;
