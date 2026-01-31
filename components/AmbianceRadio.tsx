
import React, { useState, useRef, useEffect } from 'react';
import { Music, Radio, Volume2, VolumeX, Wind, Train, CloudRain, Loader2, RefreshCw, AlertCircle } from 'lucide-react';

const STATIONS = [
    { 
        name: 'Shibuya Lo-Fi', 
        icon: Music, 
        color: 'from-blue-400 to-indigo-500',
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Lento_-_The_Nights_Music.mp3'
    },
    { 
        name: 'Subway Chime', 
        icon: Train, 
        color: 'from-slate-400 to-slate-600',
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Train_Station_Atmosphere.mp3' 
    },
    { 
        name: 'Shinjuku Rain', 
        icon: CloudRain, 
        color: 'from-cyan-400 to-blue-500',
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Rain_falling_on_a_tent.mp3'
    },
    { 
        name: 'Zen Forest', 
        icon: Wind, 
        color: 'from-emerald-400 to-green-500',
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Wind_Howling_Stereo.mp3'
    }
];

const AmbianceRadio: React.FC = () => {
    const [active, setActive] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [volume, setVolume] = useState(0.4);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio();
        audio.loop = true;
        audio.preload = "auto";
        audioRef.current = audio;

        const onWaiting = () => setIsLoading(true);
        const onPlaying = () => {
            setIsLoading(false);
            setIsError(false);
            setIsPlaying(true);
        };
        const onPause = () => setIsPlaying(false);
        const onCanPlay = () => setIsLoading(false);
        const onError = () => {
            setIsError(true);
            setIsLoading(false);
            setIsPlaying(false);
        };

        audio.addEventListener('waiting', onWaiting);
        audio.addEventListener('playing', onPlaying);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('canplay', onCanPlay);
        audio.addEventListener('error', onError);

        audio.src = STATIONS[active].url;
        audio.volume = volume;

        return () => {
            audio.removeEventListener('waiting', onWaiting);
            audio.removeEventListener('playing', onPlaying);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('canplay', onCanPlay);
            audio.removeEventListener('error', onError);
            audio.pause();
            audio.src = "";
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    const handlePlayAction = async () => {
        if (!audioRef.current) return;
        try {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                setIsLoading(true);
                setIsError(false);
                await audioRef.current.play();
            }
        } catch (err) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const handleStationChange = (idx: number) => {
        if (!audioRef.current) return;
        const wasPlaying = isPlaying;
        setActive(idx);
        setIsError(false);
        setIsLoading(true);
        audioRef.current.src = STATIONS[idx].url;
        audioRef.current.load();
        if (wasPlaying) {
            audioRef.current.play().catch(() => setIsPlaying(false));
        }
    };

    return (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-slate-200 dark:border-gray-700 rounded-2xl p-4 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg transition-all ${isPlaying ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-gray-700 text-slate-400'}`}>
                        {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Radio size={14} />}
                    </div>
                    <div>
                        <span className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest block">AMBIANCE</span>
                        <span className={`text-[10px] font-bold ${isError ? 'text-red-500' : isPlaying ? 'text-indigo-600 dark:text-neon-blue' : 'text-slate-500'}`}>
                            {isError ? '連結失敗' : isLoading ? '載入中...' : isPlaying ? '播放中' : '已暫停'}
                        </span>
                    </div>
                </div>
                <button 
                    onClick={handlePlayAction}
                    className={`p-2 rounded-full transition-all active:scale-90 ${isPlaying ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-gray-700 text-slate-500'}`}
                >
                    {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-3">
                {STATIONS.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => handleStationChange(i)}
                        className={`p-1.5 rounded-xl border text-[9px] font-bold flex flex-col items-center gap-1 transition-all ${
                            active === i 
                            ? `border-transparent bg-gradient-to-br ${s.color} text-white shadow-sm` 
                            : 'border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-500 hover:border-indigo-200'
                        }`}
                    >
                        <s.icon size={12} />
                        <span>{s.name.split(' ')[1] || s.name}</span>
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <input 
                    type="range" min="0" max="1" step="0.01" value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="flex-1 h-1 bg-slate-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
            </div>

            {isPlaying && !isLoading && !isError && (
                <div className="mt-2 flex gap-0.5 justify-center h-3 opacity-30">
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i} 
                            className="w-0.5 bg-indigo-500 dark:bg-neon-blue rounded-full animate-bounce" 
                            style={{ 
                                height: `${30 + Math.random() * 70}%`,
                                animationDuration: `${0.4 + Math.random() * 0.4}s`,
                                animationDelay: `${i * 0.05}s`
                            }}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AmbianceRadio;
