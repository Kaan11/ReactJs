import React from "react";
import "./style.css";
/*
// Bu kare tahtanın içindeki ufak kare
// şeklinde button yapmak için.
class Kare extends React.Component{
    render(){
        return (
            // => bu ifadeyi araştır.
            // 1-)value props'u tahta'dan gelen karenin içeriğinde ne
            // yazılacağını içeren props.
            // 2-)onClick props'u bir fonksiyon button'a tıklandığında
            // çalışacak event handler.
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}
*/
// 1-)Tutorial'da diyor ki sadece render method'u olan component'leri
// böyle yukarıda ki gibi React.Component class'ından extend edip bir
// class yapmana gerek yok React sadece props alıp render edeceği şeyi
// döndüren sade fonksiyonları da destekliyormuş.

// 2-) Bu arada normal javascript'te return'de parantez falan yokmuş
// bu facebook multiline yazmak için böyle birşey yapmış.
function Kare(props){
    return(
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
    );
}


// Kare component'inde state yok. Parent'inden değer alıyor ve kendisine tıklandığı zaman
// parentine bilgi veriyor. Bu tip component'lere controlled component deniyor.
class Tahta extends React.Component{
    constructor(props){
        super(props)
        // 1-)bunun çocukları olan kare componentlerine state yazmadık
        // onun yerine kare'lerin içindeki bilgiler bu tahtanın state'inde 
        // duruyorlar.
        // 2-)Karenin içinde X'mi yada O'mu olacağı xIsNext'te tutuluyor.
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    // 1-)Kare'nin içinde tıklandığında çalışacak olan fonksiyon.
    // 2-)Tahtanın state'inde olan squares dizisini alıyor
    // sonra da tıklanmış olan karenin index'i ile aynı olan dizi
    // elemanına çarpı yada yuvarlak işaretini atıyoruz. Sonra da setState yapıyoruz.
    // 3-)slice methoduna bak araştır.
    // 4-)Çarpımı yada yuvarlakmı işaretini yazacağımızı xIsNext state'i true ise 
    // X, false ise O olacak şekilde ayarlıyoruz.
    handleClick(i){
        const squares = this.state.squares.slice();
        // Eğer kazanan olursa button'lara tıkladığımızda
        // herhangi bir işlem yapmaması için.
        if (calculateWinner(squares) || squares[i]) {
            return;
          }
        if(this.state.xIsNext === true){
            squares[i]='X';
        }
        else{
            squares[i]='O';
        }
        
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    renderKare(i){
        // 1-)Başka method'un içinde de kullanabiliyorsun componentleri.
        // yani illa render'da bulunacak diye bir şey yok.
        // 2-)Her kare'ye ilgili içerikleri props olarak veriyoruz.
    return (<Kare value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)} />);
    }
    render(){
        const winner = calculateWinner(this.state.squares);
        let durum;
        if(winner){
            durum = "Winner: " + winner;
        }
        else{
            durum = "Next player: " + (this.state.xIsNext? 'X': 'O');
        }
        return(
            <div>
                <div className="status">{durum}</div>
        <div className="board-row">
          {this.renderKare(0)}
          {this.renderKare(1)}
          {this.renderKare(2)}
        </div>
        <div className="board-row">
          {this.renderKare(3)}
          {this.renderKare(4)}
          {this.renderKare(5)}
        </div>
        <div className="board-row">
          {this.renderKare(6)}
          {this.renderKare(7)}
          {this.renderKare(8)}
        </div>
            </div>
        );
    }
}

class Oyun extends React.Component{
    render(){
        return(
            <div className="game">
            <div className="game-board">
              <Tahta />
            </div>
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </div>
        );
    }
}
// Oyunu kazananı belirlediğimiz fonksiyon.
// Kazanma şartlarını lines dizisinde tutuyoruz.
function calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for(let i=0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

export default Oyun;