import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import Button from './Components/Button';
import Card from './Components/Card';
import { ICard } from './interface';
import { loadCard } from './store/slices/app-slice';
import { IReduxState } from './store/slices/state.interface';

function Home() {
  const dispatch: any = useDispatch();
  const cards = useSelector<IReduxState, ICard[]>(state => state.app.card);

  const [currentBtn, setCurrentBtn] = useState(0)
  const [text, setText] = useState("");

  function handleChange(e: any) {
    setText(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if(text == '') return;
    const tmpCard: ICard = {
      text: text,
      isCompleted: false
    };
    cards ? 
    dispatch(loadCard([tmpCard,...cards])): 
    dispatch(loadCard([tmpCard]));
    setText("");
  }

  const handleCard = (i: number) => {
    let tmpCards: ICard[] = [];
    cards.map((item, index) => {
      if(i === index){
        const tmpCard: ICard = {
          text: item.text,
          isCompleted: true
        };
        tmpCards = tmpCards? [...tmpCards, tmpCard] : [tmpCard]
      }
      else
        tmpCards = tmpCards? [...tmpCards, item] : [item]
    })
    dispatch(loadCard([...tmpCards]))
  }

  const handleAll = () => {
    if (currentBtn !== 0) setCurrentBtn(0);
  }

  const handleActive = () => {
    if (currentBtn !== 1) setCurrentBtn(1);
  }

  const handleCompleted = () => {
    if (currentBtn !== 2) setCurrentBtn(2);
  }

  //pagination
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  // const currentItems = cards.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cards?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % cards.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="w-full flex justify-center">
      <div className='py-32 max-w-[400px]'>
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} placeholder='Input text' onChange={handleChange} className='w-full border-2 border-gray-2 rounded-md p-1'/>
        </form>
        <div className='flex md:flex-row flex-col justify-between gap-2 mt-12 px-8'>
          <Button active={currentBtn === 0 ? true : false} text='All' handle={handleAll}/>
          <Button active={currentBtn === 1 ? true : false} text='Active' handle={handleActive}/>
          <Button active={currentBtn === 2 ? true : false} text='Completed' handle={handleCompleted}/>
        </div>

        <div className='flex flex-col gap-4 mt-8'>
          {
            cards?.map((item, index) =>
              currentBtn === 0 && index >= itemOffset && index <= endOffset?
                <Card key={index} card={item} handle={() => handleCard(index)}/>:
              currentBtn === 1 && index >= itemOffset && index <= endOffset?
                item.isCompleted === false &&
                  <Card key={index} card={item} handle={() => handleCard(index)}/>:
                item.isCompleted === true && index >= itemOffset && index <= endOffset &&
                  <Card key={index} card={item} handle={() => handleCard(index)}/>
            )
          }
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          // renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default Home;
