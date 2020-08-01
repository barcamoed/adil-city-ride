Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@waqasahmad34 
waqasahmad34
/
beautique-frontend
Private
1
00
Code
Issues
Pull requests
1
Actions
Projects
Security
2
Insights
Settings
beautique-frontend/app/components/HomePage/index.js /
@waqasahmad34
waqasahmad34 final changes
Latest commit 13e8b01 7 days ago
 History
 2 contributors
@waqasahmad34@faizan277
291 lines (270 sloc)  10.8 KB
  
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Scroll from'react-scroll';
import $ from 'jquery';
import onClickOutside from "react-onclickoutside";
import img1Image from '../../assets/images/img1.jpg'
import topImage from '../../assets/images/top.png'
import Header from '../Header';
import Footer from '../Footer';
import Request from '../../utils/interceptor'
import makeToast from '../../utils/toaster';

const scroll = Scroll.animateScroll;
const tagsLi  = ['Nature', 'Urban', 'Architecture']
class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      highlights: [],
      results: [],
      defaultCategory: [],
      searchValue: '',
      type: 'images',
    };


    if (localStorage.getItem('accessToken') && localStorage.getItem('role') === 'admin') {
      this.props.history.push('/admin');
    }
  }

  handleClickOutside = () => {
    document.getElementById('mySidenav').classList.remove('active');
    $('.close-overlay').addClass('d-none');
  };

  getDefaultCategories = () => {
    Request.getPublic('/api/users/getDefaultCategories')
      .then(response => {
        this.setState({defaultCategory: response && response.data.defaultCategories,loading: false})
      }).catch(error => {
        makeToast('error', error.response.data.msg);
        this.setState({ loading: false});
      })
  }

  getSearchResult = (search) => {
    const { type } = this.state;
    Request.postPublic('api/users/search', { type, search })
      .then(response => {
        const images = response && response.data.categories;
        if(images.length === 0){
          return makeToast('error','No Images Found');
        }
        return this.setState({
          results: images
        });
      })
      .catch(error => {
        console.log('error: --', error);
      });
  }

  handleSearch = (e) => {
    const val = e.target.value.trim().toLowerCase();
    this.setState({
      searchValue: val
    }, () => {
      if (this.state.searchValue && this.state.searchValue.length > 1) {
        if (this.state.searchValue.length % 2 === 0) {
          this.getSearchResult(this.state.searchValue);
        }
      // eslint-disable-next-line no-empty
      } else if (this.state.searchValue.length === 0) {
        this.setState({results: []});
      }
    })
  };

  
  handleSearchItem = (image) => {
    this.setState({
      searchValue: image.name,
      results: [],
    }, () => {
      if (this.state.searchValue && this.state.searchValue.length > 1) {
        if (this.state.searchValue.length % 2 === 0) {
          this.props.history.push(`/search-filters/${this.state.searchValue}/${this.state.type}`);
        }
      // eslint-disable-next-line no-empty
      } else if (this.state.searchValue.length === 0) {
        // this.getImages();
      }
    });
  };

  handleLiTags = (tag, i) => {
    this.props.history.push(`/search-filters/${tag.toLowerCase()}/${this.state.type}`);
  }
  
  handleType = (e) => {
    this.setState({type: e.target.value});
  }

  getHighlights = () => {
    Request.getPublic('api/users/getHighlights')
      .then(response => {
        const highlightsArray = response && response.data.highlights;
        if(highlightsArray.length === 0){
          return makeToast('error','No Highlights Found');
        }
        return this.setState({
          highlights: response && response.data.highlights,
          loading: false
        })
      })
      .catch((error) => {
      // eslint-disable-next-line no-console
        console.log('error: --',error);
        this.setState({loading: false});
      });
  }

  moveToTop = () => {
    scroll.scrollToTop();
  };

  componentDidMount(){
    this.getHighlights();
    this.getDefaultCategories();
  }

  render() {
    return (
      <>
      <Header />
       <div>
         <section className="searchbanner">
           <div className="mycontainer container">
             <div className="row">
               <div className="col-md-12">
                 <div className="searchwrap">
                   <div className="input-group">
                     <input
                       type="text" className="form-control" value={this.state.searchValue}
                       onChange={this.handleSearch} placeholder="SUCHE" />
                     <div className="input-group-append">
                       <select className="form-control" onChange={this.handleType}>
                         <option value='images'>IMAGES</option>
                         <option value='hdr-spheres'>HDR-SPHERES</option>
                         <option value='360 images'>360 IMAGES</option>
                       </select>
                     </div>
                   </div>
                   <div className="searchresults"> 
                     {
                       this.state.results.map((image, index) => (
                         <div key={index} style={{backgroundColor: '#fff'}} onClick={() => this.handleSearchItem(image)}><span>{image.name}</span><br/></div>
                       ))
                     } 
                   </div> 
                   <ul className="catag">
                     {tagsLi && Array.isArray(tagsLi) ?
                       tagsLi.map((tagli, i) => {
                         return (
                           <li key={i} onClick={()=> this.handleLiTags(tagli,i)}>{tagli}</li>
                         )
                       }): null}
                     <li>More</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>
         </section>
         <section className="imglisting">
           <div className="mycontainer container">
             <div className="row">
               {
                 this.state.defaultCategory && Array.isArray(this.state.defaultCategory) && !this.state.loading ? (
                   this.state.defaultCategory.map(category => {
                     return (
                       <div className="col-md-3" key={category._id}>
                         <div className="box">
                           <h3>{category.title.toUpperCase()}</h3>
                           <p>{category.description}</p>
                           <img src={category.imageLink ? category.imageLink : img1Image} className="img-fluid" alt="" />
                         </div>
                         <Link to={category.title.toLowerCase() === '360 images' ? `/three-sixty-images` : `/${category.title.toLowerCase()}`} className="btn btnstyle1">MORE</Link>
                       </div>
                     )
                   })
                 ) : null
               }
               <div className="col-md-3">
                 <div className="box">
                   <h3>SUPERVISION</h3>
                   <p>Dies ist ein Typoblindtext.</p>
                   <img src={img1Image} className="img-fluid" alt="" />
                 </div>
                 <Link to="/supervision" className="btn btnstyle1">MORE</Link>
               </div>
             </div>
           </div>
         </section>
         <section className="monthly">
           <div className="container mycontainer">
             <div className="row">
               <div className="col-sm-12">
                 <h1>OUR MONTHLY<br /> HIGHLIGHTS</h1>
               </div>
             </div>
             <div className="row">
               <div className="col-md-12">
                 
                 {this.state.highlights && Array.isArray(this.state.highlights) && !this.state.loading ? (
                   this.state.highlights.map(highlight=>{
                     return (
                       <div className="monthlywrap" key={highlight._id}>
                         <div className="row">
                           <div className="col-md-12">
                             <h2>{highlight.title}</h2>
                           </div>
                         </div>
                         <div className="row">
                           <div className="col-md-12">
                             <img src={highlight.images[0].imageLink} className="img-fluid mainhighlight" alt="" />
                           </div>
                           <div className="col-md-6">
                             <img src={highlight.images[1].imageLink} className="img-fluid subhighlight" alt="" />
                           </div>
                           <div className="col-md-3 p-0">
                             <img src={highlight.images[2].imageLink} className="img-fluid subhighlight" alt="" />
                           </div>
                           <div className="col-md-3">
                             <img src={highlight.images[3].imageLink} className="img-fluid subhighlight" alt="" />
                           </div>
                         </div>
                         <div className="row">
                           <div className="col-md-12">
                             <div className="whohighlighter">
                               <div className="profiler">
                                 <div className>
                                   <h4>{highlight.user.firstName.toUpperCase()} {highlight.user.lastName.toUpperCase()}</h4>
                                   <p>{highlight.user.company}<br /> {highlight.user.supervision ? 'supervision available' : 'supervision not available'}</p>
                                 </div>
                                 <img src={highlight.user.profileImage} alt="" />
                               </div>
                               <div className="action">
                                 <Link to={`/user/profile/${highlight.user._id}`} className="btn btnstyle1">Show Profile</Link>
                                 <Link to={`/highlight-perspective/${highlight._id}`} className="btn btnstyle1">More</Link>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     )
                   })
                 ) : (<h6>No Highlights Found For This Month</h6>)}
              
               </div>
             </div>
           </div>
         </section>
         <div className="movetop">
           <Link onClick={()=> this.moveToTop()}>Top <img src={topImage} alt="" /></Link>
         </div>
       </div>
      <Footer />
    
      </>
    );
  }
};

export default onClickOutside(HomePage);
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
