# import os

# def collect_project_files(project_root, output_filename="project_1.txt"):
#     """
#     Parses a React Native project, collects content of all files (excluding
#     node_modules and package-lock.json), and writes them to a single file.

#     Args:
#         project_root (str): The root directory of the React Native project.
#         output_filename (str): The name of the output file.
#     """
#     with open(output_filename, 'w', encoding='utf-8') as outfile:
#         for root, dirs, files in os.walk(project_root):
#             # Skip node_modules directory
#             dirs[:] = [d for d in dirs if d != 'node_modules']

#             for file in files:
#                 # Skip package-lock.json
#                 if file == 'package-lock.json':
#                     continue

#                 file_path = os.path.join(root, file)
#                 relative_path = os.path.relpath(file_path, project_root)

#                 # Ensure dot files/folders are included, as per requirements
#                 # The os.walk already handles hidden directories and files as long as they are not explicitly skipped.
#                 # The primary exclusion is node_modules, which is handled above.

#                 try:
#                     with open(file_path, 'r', encoding='utf-8') as infile:
#                         content = infile.read()
#                         outfile.write(f"{relative_path}\n")
#                         outfile.write("........................................\n")
#                         outfile.write(content)
#                         outfile.write("\n........................................\n\n")
#                 except Exception as e:
#                     print(f"Could not read file {file_path}: {e}")

# if __name__ == "__main__":
#     # Get the current working directory, which should be the project root
#     project_root_directory = os.getcwd()
#     print(f"Starting to collect files from: {project_root_directory}")
#     collect_project_files(project_root_directory)
#     print(f"All relevant project files have been written to project_1.txt")



import os

def collect_project_files(project_root, output_filename="project_1.txt"):
    """
    Parses a React Native project, collects content of all files (excluding
    node_modules, package-lock.json, .ts, and .tsx files), and writes them
    to a single file.

    Args:
        project_root (str): The root directory of the React Native project.
        output_filename (str): The name of the output file.
    """
    with open(output_filename, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(project_root):
            # Skip node_modules directory
            dirs[:] = [d for d in dirs if d != 'node_modules']

            for file in files:
                # Skip package-lock.json
                if file == 'package-lock.json':
                    continue

                # OMIT .ts and .tsx files
                if file.endswith('.ts') or file.endswith('.tsx'):
                    continue

                # OMIT sample files
                if file.endswith('.sample.json') or file.endswith('.env'):
                    continue

                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, project_root)

                try:
                    with open(file_path, 'r', encoding='utf-8') as infile:
                        content = infile.read()
                        outfile.write(f"{relative_path}\n")
                        outfile.write("........................................\n")
                        outfile.write(content)
                        outfile.write("\n........................................\n\n")
                except Exception as e:
                    print(f"Could not read file {file_path}: {e}")

if __name__ == "__main__":
    # Get the current working directory, which should be the project root
    project_root_directory = os.getcwd()
    print(f"Starting to collect files from: {project_root_directory}")
    collect_project_files(project_root_directory)
    print(f"All relevant project files have been written to project_1.txt")