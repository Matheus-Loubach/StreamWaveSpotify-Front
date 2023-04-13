import ListBest from './ListBest';

//vem do SearchMusic.tsx
const LoadingBest = ({ resultBest }: { resultBest: Array<any> }) => {
  return (
    <div>
      {resultBest.slice(0, 1).map((music: any) => (<ListBest music={music} />))}
    </div>
  );
};

export default LoadingBest;