cmake_minimum_required(VERSION 2.8)

project(MatClass)

find_package(OpenCV REQUIRED)

add_executable(MatClass.out MatClass.cpp MatClass.cpp)

target_link_libraries(MatClass.out ${OpenCV_LIBS})
