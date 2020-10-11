using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Product, ProductToReturnDto>()
                      .ForMember(dest => dest.ProductBrand, source => source.MapFrom(m => m.ProductBrand.Name))
                      .ForMember(dest => dest.ProductType, source => source.MapFrom(m => m.ProductType.Name))
                      .ForMember(dest=>dest.PictureUrl,source=>source.MapFrom<ProductUrlResolver>());
        }
    }
}
