package com.example.demo.Dao;

import java.beans.JavaBean;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.catalina.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.context.annotation.Configuration;

import com.example.demo.Dto.ImageDto;
import com.example.demo.Dto.ItemDto;
import com.example.demo.Dto.OrderDto;
import com.example.demo.Dto.UserDto;

@Mapper
public interface ShowpingDao {
	

		
	//--------------회원가입 만들기--------------------//
	
	@Insert("insert into userdto\r\n"
			+ " (userid,userpw,username,address1,address2,address3,phone1,phone2,phone3)\r\n"
			+ " values"
			+ " (#{userid},#{userpw},#{username},#{address1},#{address2},#{address3},#{phone1},#{phone2},#{phone3})")
	public void signup(UserDto userDto);
	

	@Select("select userid from userdto where userid= #{userid}")
	public  UserDto confirmid(String userid);
	
	//------------------로그인페이지 만들기---------------------------//
	
	@Select("select * from userdto u where userid = #{userid}")
	public UserDto login(String userid);
	
	
	//-----------------유저정보수정페이지 만들기--------------------------//
	
	@Select("select * from userdto u where userid = #{userid};")
	public UserDto userinfo2(String userid);
	
	@Update("update userdto set userpw = #{userpw}\r\n"
			+ ",address1 =#{address1},address2 =#{address2},address3 =#{address3} \r\n"
			+ ",phone1 =#{phone1},phone2=#{phone2},phone3=#{phone3}\r\n"
			+ "where userid = #{userid}")
	public void userupdate(UserDto userDto);
	
	//-------------------상품메인페이지 만들기---------------------------//
	
	@Select("select i.itemid,itemname,itemprice,filename,filepath \r\n"
			+ " from itemdto i inner join imagedto i2 \r\n"
			+ " on i.itemid = i2.itemid ;\r\n"
			+ "")
	public ArrayList<HashMap<String, Object>> itemlist();
	
	//-----------------------상품상세페이지만들기------------------------//
	
	@Select("select i.itemid,itemname,itemprice,filename,filepath \r\n"
			+ " from itemdto i inner join imagedto i2 \r\n"
			+ " on i.itemid = i2.itemid \r\n"
			+ " where i.itemid = #{itemid}")
	public HashMap<String, Object> iteminfo2(String itemid);
	
	

	
	//---------------------------주문내역 보여주기-------------------//
	@Select("select * from itemdto i \r\n"
			+ "inner join orderdto o \r\n"
			+ "on i.itemid = o.orderitemid \r\n"
			+ "where o.orderuserid = #{userid}")
	public ArrayList<OrderDto> orderlist(String userid);
	
	@Insert("insert into orderdto(orderid,orderitemid,orderitemnumber,orderuserid) \r\n"
			+ "values(#{orderid},#{orderitemid},#{orderitemnumber},#{orderuserid});")
	public void insertorder(OrderDto orderDto);
	
	
	
	
	//-----------------장바구니페이지 만들기----------------------------//
	
	@Select("select * from userdto u where userid = #{userid}")
	public UserDto userinfo(String userid);

	
	//---------------------상품등록페이지만들기--------------------------//
	
	@Insert("insert \r\n"
			+ " into itemdto(itemname,itemdetail,itemprice,itemstock) values(#{itemname},#{itemdetail},#{itemprice},#{itemstock})")
	public void insertitem(ItemDto itemDto);
	
	@Insert("insert \r\n"
			+ " into imagedto(filename,filepath,itemid) values(#{filename},#{filepath},\r\n"
			+ " (select max(itemid) from itemdto i))")
	public void insertimage(ImageDto imageDto);
	
	//------------------상품수정페이지만들기--------------------------------//
	
	@Select("select * from itemdto where itemid = #{itemid}")
	public ItemDto iteminfo(String itemid);
	
	@Update("update itemdto \r\n"
			+ "set itemname=#{itemname},itemdetail =#{itemdetail},itemprice =#{itemprice},itemstock =#{itemstock}\r\n"
			+ "where itemid = #{itemid}")
	public void updateitem(ItemDto itemDto);
	
	@Update("update imagedto \r\n"
			+ "set filename =#{filename},filepath =#{filepath}\r\n"
			+ "where itemid = #{itemid};")
	public void updateimage(ImageDto imageDto);
	
	
	
	
	
	
	
	
	
	
	
}
